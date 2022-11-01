package com.spring.test.demo.repository;

import com.spring.test.demo.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
//The repository that will make the communication with the database
public interface StockRepository extends JpaRepository<Stock, Integer> {

    List<Stock> findByAuctionId(Long auctionId);

}
