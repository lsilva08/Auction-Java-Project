package com.spring.test.demo.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.spring.test.demo.model.Client;
import com.spring.test.demo.repository.ClientRepository;
import com.spring.test.demo.views.ClientView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clients")
//Specifies the url that this controller will act, and the function that will be called for each HTTP Method
public class ClientController {

    @Autowired
    ClientRepository clientRepository;

    @GetMapping
    @JsonView(ClientView.Summary.class)
    public ResponseEntity<List<Client>> listClients() {
        List<Client> clients = clientRepository.findAll();
        return ResponseEntity.ok(clients);
    }

    @PostMapping
    @JsonView(ClientView.Summary.class)
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        return ResponseEntity.ok(clientRepository.save(client));
    }

    @GetMapping("/{id}")
    @JsonView(ClientView.Summary.class)
    public ResponseEntity<Client> findClient(@PathVariable Integer id) {
        Optional<Client> optionalStoredClient = clientRepository.findById(id);

        if(optionalStoredClient.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clientRepository.findById(id).get());
    }

    @PutMapping("/{id}")
    @JsonView(ClientView.Summary.class)
    public ResponseEntity<Client> update(
            @PathVariable Integer id,
            @RequestBody Client client
    ) {
        Optional<Client> optionalStoredClient = clientRepository.findById(id);

        if(optionalStoredClient.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Client storedClient = optionalStoredClient.get();

        BeanUtils.copyProperties(client, storedClient, "id");
        clientRepository.save(storedClient);
        return ResponseEntity.ok(storedClient);

    }

    @DeleteMapping("/{id}")
    @JsonView(ClientView.Summary.class)
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Client> optionalStoredClient = clientRepository.findById(id);

        if(optionalStoredClient.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        clientRepository.delete(optionalStoredClient.get());
        return ResponseEntity.noContent().build();
    }

}


