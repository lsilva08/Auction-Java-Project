package com.spring.test.demo.repository;

import com.spring.test.demo.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//The repository that will make the communication with the database
public interface AuctionRepository extends JpaRepository<Auction, Integer> {
    
}