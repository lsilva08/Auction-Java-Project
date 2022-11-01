package com.spring.test.demo.controller;

import com.spring.test.demo.DemoApplicationTests;
import com.spring.test.demo.model.Auction;
import com.spring.test.demo.model.Stock;
import com.spring.test.demo.repository.AuctionRepository;
import com.spring.test.demo.repository.StockRepository;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AuctionControllerTest extends DemoApplicationTests {

    Calendar calendar = Calendar.getInstance();
    Date date;

    List<Auction> auctionList;

    String auctionJsonList = "[ {\r\n  \"id\" : 1,\r\n  \"name\" : \"name\",\r\n  \"shortDescription\" : \"shortDescription\",\r\n  \"longDescription\" : \"longDescription\",\r\n  \"importantInformation\" : \"importantInformation\",\r\n  \"timedAuction\" : true,\r\n  \"buyItNowAuction\" : true,\r\n  \"venueAddressBuyersFinancials\" : true,\r\n  \"venueAddressVendorsFinancials\" : true,\r\n  \"venueAddressNonFinancials\" : true,\r\n  \"startDate\" : \"2020-12-25\",\r\n  \"stocks\" : null\r\n}, {\r\n  \"id\" : 2,\r\n  \"name\" : \"name\",\r\n  \"shortDescription\" : \"shortDescription\",\r\n  \"longDescription\" : \"longDescription\",\r\n  \"importantInformation\" : \"importantInformation\",\r\n  \"timedAuction\" : true,\r\n  \"buyItNowAuction\" : true,\r\n  \"venueAddressBuyersFinancials\" : true,\r\n  \"venueAddressVendorsFinancials\" : true,\r\n  \"venueAddressNonFinancials\" : true,\r\n  \"startDate\" : \"2020-12-25\",\r\n  \"stocks\" : null\r\n}, {\r\n  \"id\" : 3,\r\n  \"name\" : \"name\",\r\n  \"shortDescription\" : \"shortDescription\",\r\n  \"longDescription\" : \"longDescription\",\r\n  \"importantInformation\" : \"importantInformation\",\r\n  \"timedAuction\" : true,\r\n  \"buyItNowAuction\" : true,\r\n  \"venueAddressBuyersFinancials\" : true,\r\n  \"venueAddressVendorsFinancials\" : true,\r\n  \"venueAddressNonFinancials\" : true,\r\n  \"startDate\" : \"2020-12-25\",\r\n  \"stocks\" : null\r\n} ]";
    String firstElement = "{\r\n  \"id\" : 1,\r\n  \"name\" : \"name\",\r\n  \"shortDescription\" : \"shortDescription\",\r\n  \"longDescription\" : \"longDescription\",\r\n  \"importantInformation\" : \"importantInformation\",\r\n  \"timedAuction\" : true,\r\n  \"buyItNowAuction\" : true,\r\n  \"venueAddressBuyersFinancials\" : true,\r\n  \"venueAddressVendorsFinancials\" : true,\r\n  \"venueAddressNonFinancials\" : true,\r\n  \"startDate\" : \"2020-12-25\",\r\n  \"stocks\" : null\r\n}";

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean(AuctionRepository.class)
    private AuctionRepository auctionRepository;

    @MockBean(StockRepository.class)
    private StockRepository stockRepository;

    @BeforeAll
    void setup() {
        calendar.set(2020, Calendar.DECEMBER, 25);
        date = calendar.getTime();
        auctionList  = Arrays.asList(
                new Auction(
                        1, "name", "shortDescription", "longDescription", "importantInformation",
                        true, true, true, true, true,
                        date),
                new Auction(
                        2, "name", "shortDescription", "longDescription", "importantInformation",
                        true, true, true, true, true,
                        date),
                new Auction(
                        3, "name", "shortDescription", "longDescription", "importantInformation",
                        true, true, true, true, true,
                        date)
        );
    }

    @Test
    void listAllAuctions() throws Exception {
        when(auctionRepository.findAll()).thenReturn(auctionList);
        mockMvc
                .perform(
                        get("/auctions")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isOk())
                .andExpect(content().json(auctionJsonList));
    }

    @Test
    void createNewAuction() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        mockMvc
                .perform(
                        post("/auctions")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token)
                                .content(writer.writeValueAsString(auctionList.get(0))))
                .andExpect(status().isOk());

        verify(auctionRepository, times(1)).save(any());

    }

    @Test
    void showAuction() throws Exception {
        when(auctionRepository.findById(1)).thenReturn(Optional.of(auctionList.get(0)));

        mockMvc
                .perform(
                        get("/auctions/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isOk())
                .andExpect(content().json(firstElement));
    }

    @Test
    void showAuctionNotFound() throws Exception {
        when(auctionRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        get("/auctions/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNotFound());
    }

    @Test
    void showAuctionStocks() throws Exception {
        List<Stock> stockList = Arrays.asList(
                new Stock(1, "name", "store", "category", 100.0, 150.0, 200.0, 250.0, "shortDescription", "longDescription",
                        10, 10.5, "notes"),
                new Stock(2, "name", "store", "category", 100.0, 150.0, 200.0, 250.0, "shortDescription", "longDescription",
                        10, 10.5, "notes"),
                new Stock(3, "name", "store", "category", 100.0, 150.0, 200.0, 250.0, "shortDescription", "longDescription",
                        10, 10.5, "notes")
        );
        String jsonStockList = "[ {\r\n  \"id\" : 1,\r\n  \"name\" : \"name\",\r\n  \"store\" : \"store\",\r\n  \"category\" : \"category\",\r\n  \"reserve\" : 100.0,\r\n  \"initialEstimate\" : 150.0,\r\n  \"finalEstimate\" : 200.0,\r\n  \"buyNowPrice\" : 250.0,\r\n  \"shortDescription\" : \"shortDescription\",\r\n  \"longDescription\" : \"longDescription\",\r\n  \"quantity\" : 10,\r\n  \"weight\" : 10.5,\r\n  \"notes\" : \"notes\",\r\n  \"client\" : null,\r\n  \"clientId\" : null,\r\n  \"auctionId\" : null\r\n}, {\r\n  \"id\" : 2,\r\n  \"name\" : \"name\",\r\n  \"store\" : \"store\",\r\n  \"category\" : \"category\",\r\n  \"reserve\" : 100.0,\r\n  \"initialEstimate\" : 150.0,\r\n  \"finalEstimate\" : 200.0,\r\n  \"buyNowPrice\" : 250.0,\r\n  \"shortDescription\" : \"shortDescription\",\r\n  \"longDescription\" : \"longDescription\",\r\n  \"quantity\" : 10,\r\n  \"weight\" : 10.5,\r\n  \"notes\" : \"notes\",\r\n  \"client\" : null,\r\n  \"clientId\" : null,\r\n  \"auctionId\" : null\r\n}, {\r\n  \"id\" : 3,\r\n  \"name\" : \"name\",\r\n  \"store\" : \"store\",\r\n  \"category\" : \"category\",\r\n  \"reserve\" : 100.0,\r\n  \"initialEstimate\" : 150.0,\r\n  \"finalEstimate\" : 200.0,\r\n  \"buyNowPrice\" : 250.0,\r\n  \"shortDescription\" : \"shortDescription\",\r\n  \"longDescription\" : \"longDescription\",\r\n  \"quantity\" : 10,\r\n  \"weight\" : 10.5,\r\n  \"notes\" : \"notes\",\r\n  \"client\" : null,\r\n  \"clientId\" : null,\r\n  \"auctionId\" : null\r\n} ]";
        when(auctionRepository.findById(1)).thenReturn(Optional.of(auctionList.get(0)));
        when(stockRepository.findByAuctionId(1L)).thenReturn(stockList);
        mockMvc
                .perform(
                        get("/auctions/1/stocks")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isOk())
        .andExpect(content().json(jsonStockList));
    }

    @Test
    void showAuctionStocksNotFound() throws Exception {
        when(auctionRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        get("/auctions/1/stocks")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateAuction() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        when(auctionRepository.findById(1)).thenReturn(Optional.of(auctionList.get(0)));
        mockMvc
                .perform(
                        put("/auctions/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token)
                                .content(writer.writeValueAsString(auctionList.get(0))))
                .andExpect(status().isOk());

        verify(auctionRepository, times(1)).save(any());

    }

    @Test
    void updateAuctionNotFound() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        when(auctionRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        put("/auctions/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token)
                                .content(writer.writeValueAsString(auctionList.get(0))))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteAuction() throws Exception {
        when(auctionRepository.findById(1)).thenReturn(Optional.of(auctionList.get(0)));
        mockMvc
                .perform(
                        delete("/auctions/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNoContent());

        verify(auctionRepository, times(1)).delete(any());

    }

    @Test
    void deleteAuctionNotFound() throws Exception {
        when(auctionRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        delete("/auctions/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNotFound());
    }


}
