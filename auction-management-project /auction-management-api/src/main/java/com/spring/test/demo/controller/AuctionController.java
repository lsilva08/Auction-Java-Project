package com.spring.test.demo.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.spring.test.demo.model.Auction;
import com.spring.test.demo.model.Stock;
import com.spring.test.demo.repository.AuctionRepository;
import com.spring.test.demo.repository.StockRepository;
import com.spring.test.demo.views.AuctionView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auctions")
//Specifies the url that this controller will act, and the function that will be called for each HTTP Method
public class AuctionController {

    @Autowired
    AuctionRepository auctionRepository;

    @Autowired
    StockRepository stockRepository;

    @GetMapping
    @JsonView(AuctionView.Summary.class)
    public ResponseEntity<List<Auction>> listAuctions() {
        List<Auction> auctions = auctionRepository.findAll();
        return ResponseEntity.ok(auctions);
    }

    @PostMapping
    @JsonView(AuctionView.Summary.class)
    public ResponseEntity<Auction> createAuction(@RequestBody Auction auction) {
        return ResponseEntity.ok(auctionRepository.save(auction));
    }

    @GetMapping("/{id}")
    @JsonView(AuctionView.Summary.class)
    public ResponseEntity<Auction> findAuction(@PathVariable Integer id) {
        Optional<Auction> optionalStoredAuction = auctionRepository.findById(id);

        if(optionalStoredAuction.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(auctionRepository.findById(id).get());
    }

    @GetMapping("/{id}/stocks")
    @JsonView(AuctionView.Summary.class)
    public ResponseEntity<List<Stock>> findAuctionStocks(@PathVariable Integer id) {
        Optional<Auction> optionalStoredAuction = auctionRepository.findById(id);

        if(optionalStoredAuction.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(stockRepository.findByAuctionId(Long.valueOf(id)));
    }

    @PutMapping("/{id}")
    @JsonView(AuctionView.Summary.class)
    public ResponseEntity<Auction> update(
            @PathVariable Integer id,
            @RequestBody Auction auction
    ) {
        Optional<Auction> optionalStoredAuction = auctionRepository.findById(id);

        if(optionalStoredAuction.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Auction storedAuction = optionalStoredAuction.get();

        BeanUtils.copyProperties(auction, storedAuction, "id");
        auctionRepository.save(storedAuction);
        return ResponseEntity.ok(storedAuction);

    }

    @DeleteMapping("/{id}")
    @JsonView(AuctionView.Summary.class)
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Auction> optionalStoredAuction = auctionRepository.findById(id);

        if(optionalStoredAuction.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        auctionRepository.delete(optionalStoredAuction.get());
        return ResponseEntity.noContent().build();
    }

}


