package com.spring.test.demo.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.spring.test.demo.model.Stock;
import com.spring.test.demo.repository.StockRepository;
import com.spring.test.demo.views.StockView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stocks")
//Specifies the url that this controller will act, and the function that will be called for each HTTP Method
public class StockController {

    @Autowired
    StockRepository stockRepository;

    @GetMapping
    @JsonView(StockView.Summary.class)
    public ResponseEntity<List<Stock>> listAllStocks() {
        return ResponseEntity.ok(stockRepository.findAll());
    }

    @PostMapping
    @JsonView(StockView.Summary.class)
    public ResponseEntity<Stock> create(@RequestBody Stock stock) {
        return ResponseEntity.ok(stockRepository.save(stock));
    }

    @GetMapping("/{id}")
    @JsonView(StockView.Summary.class)
    public ResponseEntity<Stock> findStock(@PathVariable Integer id) {
        Optional<Stock> optionalStoredStock = stockRepository.findById(id);

        if(optionalStoredStock.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(stockRepository.findById(id).get());
    }

    @PutMapping("/{id}")
    @JsonView(StockView.Summary.class)
    public ResponseEntity<Stock> update(
            @PathVariable Integer id,
            @RequestBody Stock stock
    ) {
        Optional<Stock> optionalStoredStock = stockRepository.findById(id);

        if(optionalStoredStock.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Stock storedStock = optionalStoredStock.get();

        BeanUtils.copyProperties(stock, storedStock, "id");
        stockRepository.save(storedStock);
        return ResponseEntity.ok(storedStock);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Stock> optionalStoredStock = stockRepository.findById(id);

        if(optionalStoredStock.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        stockRepository.delete(optionalStoredStock.get());
        return ResponseEntity.noContent().build();
    }

}
