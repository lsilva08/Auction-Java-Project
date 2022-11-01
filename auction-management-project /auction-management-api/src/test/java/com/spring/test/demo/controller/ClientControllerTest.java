package com.spring.test.demo.controller;

import com.spring.test.demo.DemoApplicationTests;
import com.spring.test.demo.model.Client;
import com.spring.test.demo.repository.ClientRepository;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.*;

import org.springframework.security.web.FilterChainProxy;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class ClientControllerTest extends DemoApplicationTests {

    List<Client> clientList = Arrays.asList(
            new Client(1,"displayName", "title", "firstName", "lastName",
                    "address", "town", "country", "postcode", "email", "phone"),
            new Client(2,"displayName", "title", "firstName", "lastName",
                    "address", "town", "country", "postcode", "email", "phone"),
            new Client(3,"displayName", "title", "firstName", "lastName",
                    "address", "town", "country", "postcode", "email", "phone")
    );

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean(ClientRepository.class)
    private ClientRepository clientRepository;

    @Autowired
    private WebApplicationContext wac;

    @Autowired
    private FilterChainProxy springSecurityFilterChain;



    @Test
    void listAllClients() throws Exception {
        when(clientRepository.findAll()).thenReturn(clientList);
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        mockMvc
                .perform(
                        get("/clients")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isOk())
        .andExpect(content().json(writer.writeValueAsString(clientList)));
    }

    @Test
    void createNewClient() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        mockMvc
                .perform(
                        post("/clients")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token)
                                .content(writer.writeValueAsString(clientList.get(0))))
                .andExpect(status().isOk());

        verify(clientRepository, times(1)).save(any());

    }

    @Test
    void showClient() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        when(clientRepository.findById(1)).thenReturn(Optional.of(clientList.get(0)));

        mockMvc
                .perform(
                        get("/clients/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isOk())
                .andExpect(content().json(writer.writeValueAsString(clientList.get(0))));
    }

    @Test
    void showClientNotFound() throws Exception {
        when(clientRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        get("/clients/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateClient() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        when(clientRepository.findById(1)).thenReturn(Optional.of(clientList.get(0)));
        mockMvc
                .perform(
                        put("/clients/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token)
                                .content(writer.writeValueAsString(clientList.get(0))))
                .andExpect(status().isOk());

        verify(clientRepository, times(1)).save(any());

    }

    @Test
    void updateClientNotFound() throws Exception {
        ObjectWriter writer = objectMapper.writer().withDefaultPrettyPrinter();
        when(clientRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        put("/clients/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token)
                                .content(writer.writeValueAsString(clientList.get(0))))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteClient() throws Exception {
        when(clientRepository.findById(1)).thenReturn(Optional.of(clientList.get(0)));
        mockMvc
                .perform(
                        delete("/clients/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNoContent());

        verify(clientRepository, times(1)).delete(any());

    }

    @Test
    void deleteClientNotFound() throws Exception {
        when(clientRepository.findById(1)).thenReturn(Optional.empty());
        mockMvc
                .perform(
                        delete("/clients/1")
                                .contentType("application/json")
                                .header("Authorization", "Bearer " + TokenFactory.token))
                .andExpect(status().isNotFound());
    }


}
