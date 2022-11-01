package com.spring.test.demo.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.spring.test.demo.views.AuctionView;
import com.spring.test.demo.views.ClientView;
import com.spring.test.demo.views.StockView;

import javax.persistence.*;

@Entity
//Map the database Entity and it relationships
public class Stock {

    public Stock() {}

    public Stock(
            Integer id, String name, String store, String category, Double reserve, Double initialEstimate,
            Double finalEstimate, Double buyNowPrice, String shortDescription, String longDescription,
            Integer quantity, Double weight, String notes)
    {
        this.id = id;
        this.name = name;
        this.store = store;
        this.category = category;
        this.reserve = reserve;
        this.initialEstimate = initialEstimate;
        this.finalEstimate = finalEstimate;
        this.buyNowPrice = buyNowPrice;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.quantity = quantity;
        this.weight = weight;
        this.notes = notes;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Integer id;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String name;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String store;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String category;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Double reserve;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Double initialEstimate;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Double finalEstimate;

    @Column(name = "buy_now_price")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Double buyNowPrice;

    @Column(name = "short_description")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String shortDescription;

    @Column(name = "long_description")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String longDescription;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Integer quantity;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Double weight;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String notes;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "client_id",  insertable = false, updatable = false)
    @JsonView({StockView.Summary.class, AuctionView.Summary.class})
    private Client client;

    @Column(name = "client_id")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Long clientId;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "auction_id",  insertable = false, updatable = false)
    @JsonView({StockView.Summary.class, ClientView.Summary.class})
    private Auction auction;

    @Column(name = "auction_id")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Long auctionId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStore() {
        return store;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getReserve() {
        return reserve;
    }

    public void setReserve(Double reserve) {
        this.reserve = reserve;
    }

    public Double getInitialEstimate() {
        return initialEstimate;
    }

    public void setInitialEstimate(Double  initialEstimate) {
        this.initialEstimate = initialEstimate;
    }

    public Double getFinalEstimate() {
        return finalEstimate;
    }

    public void setFinalEstimate(Double  finalEstimate) {
        this.finalEstimate = finalEstimate;
    }

    public Double getBuyNowPrice() {
        return buyNowPrice;
    }

    public void setBuyNowPrice(Double buyNowPrice) {
        this.buyNowPrice = buyNowPrice;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Long auctionId) {
        this.auctionId = auctionId;
    }
}
