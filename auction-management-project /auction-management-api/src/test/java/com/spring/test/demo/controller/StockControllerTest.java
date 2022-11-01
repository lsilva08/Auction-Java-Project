package com.spring.test.demo.controller;

import com.spring.test.demo.DemoApplicationTests;
import com.spring.test.demo.model.Stock;
import com.spring.test.demo.repository.StockRepository;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.*;

import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class StockControllerTest extends DemoApplicationTests {

    List<Stock> stockList = Arrays.asList(
            new Stock(1, "name", "store", "category", 100.0, 150.0, 200.0, 250.0, "shortDescription", "longDescription",
                    10, 10.5, "notes"),
            new Stock(2, "name", "store", "category", 100.0, 150.0, 200.0, 250.0, "shortDescription", "longDescription",
                    10, 10.5, "notes"),
            new Stock(3, "name", "store", "category", 100.0, 150.0, 200.0, 250.0, "shortDescription", "longDescription",
                    10, 10.5, "notes")
    );
    
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean(StockRepository.class)
    private StockRepository stockRepository;

    private String obtainAccessToken(String username, String password) throws Exception {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "password");
        params.add("stock_id", "stock");
        params.add("stock_secret", "123");
        params.add("username", username);
        params.add("password", password);

        ResultActions result
                = mockMvc.perform(post("/oauth/token")
                .params(params)
                .with(httpBasic("stock","secret"))
                .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));

        String resultString = result.andReturn().getResponse().getContentAsString();

        JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resultString).get("access_token").toString();
    }

    @Test
    void listAllStocks() throws Exception {
        when(stockRepository.findAll()).thenReturn(stockList);
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        mockMvc
                .perform(
                        get("/stocks")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isOk())
                .andExpect(content().json(writer.writeValueAsString(stockList)));
    }

    @Test
    void createNewStock() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        mockMvc
                .perform(
                        post("/stocks")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token)
                                .content(writer.writeValueAsString(stockList.get(0))))
                .andExpect(status().isOk());

        verify(stockRepository, times(1)).save(any());

    }

    @Test
    void showStock() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        when(stockRepository.findById(1)).thenReturn(Optional.of(stockList.get(0)));

        mockMvc
                .perform(
                        get("/stocks/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isOk())
                .andExpect(content().json(writer.writeValueAsString(stockList.get(0))));
    }

    @Test
    void showStockNotFound() throws Exception {
        when(stockRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        get("/stocks/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateStock() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        when(stockRepository.findById(1)).thenReturn(Optional.of(stockList.get(0)));
        mockMvc
                .perform(
                        put("/stocks/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token)
                                .content(writer.writeValueAsString(stockList.get(0))))
                .andExpect(status().isOk());

        verify(stockRepository, times(1)).save(any());

    }

    @Test
    void updateStockNotFound() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        when(stockRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        put("/stocks/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token)
                                .content(writer.writeValueAsString(stockList.get(0))))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteStock() throws Exception {
        when(stockRepository.findById(1)).thenReturn(Optional.of(stockList.get(0)));
        mockMvc
                .perform(
                        delete("/stocks/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNoContent());

        verify(stockRepository, times(1)).delete(any());

    }

    @Test
    void deleteStockNotFound() throws Exception {
        when(stockRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        delete("/stocks/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNotFound());
    }


}
