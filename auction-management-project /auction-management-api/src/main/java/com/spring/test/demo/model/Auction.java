package com.spring.test.demo.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.spring.test.demo.views.AuctionView;
import com.spring.test.demo.views.ClientView;
import com.spring.test.demo.views.StockView;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
//Map the database Entity and it relationships
public class Auction {

    public Auction () {}

    public Auction(
            int id, String name, String shortDescription, String longDescription, String importantInformation,
            Boolean timedAuction, Boolean buyItNowAuction, Boolean venueAddressBuyersFinancials,
            Boolean venueAddressVendorsFinancials, Boolean venueAddressNonFinancials, Date startDate
    ) {
        this.id = id;
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.importantInformation = importantInformation;
        this.timedAuction = timedAuction;
        this.buyItNowAuction = buyItNowAuction;
        this.venueAddressBuyersFinancials = venueAddressBuyersFinancials;
        this.venueAddressVendorsFinancials = venueAddressVendorsFinancials;
        this.venueAddressNonFinancials = venueAddressNonFinancials;
        this.startDate = startDate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private int id;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String name;

    @Column(name = "short_description")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String shortDescription;

    @Column(name = "long_description")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String longDescription;

    @Column(name = "important_information")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String importantInformation;

    @Column(name = "timed_auction")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Boolean timedAuction;

    @Column(name = "buy_it_now_auction")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Boolean buyItNowAuction;

    @Column(name = "venue_address_buyers_financials")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Boolean venueAddressBuyersFinancials;

    @Column(name = "venue_address_vendors_financials")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Boolean venueAddressVendorsFinancials;

    @Column(name = " venue_address_non_financials")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private Boolean venueAddressNonFinancials;

    @Column(name="start_date", columnDefinition = "date")
    @Temporal(TemporalType.DATE)
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    public Date startDate;

    @OneToMany(mappedBy = "auction", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonView(AuctionView.Summary.class)
    private Set<Stock> stocks;

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public String getImportantInformation() {
        return importantInformation;
    }

    public void setImportantInformation(String importantInformation) {
        this.importantInformation = importantInformation;
    }

    public Boolean getTimedAuction() {
        return timedAuction;
    }

    public void setTimedAuction(Boolean timedAuction) {
        this.timedAuction = timedAuction;
    }

    public Boolean getBuyItNowAuction() {
        return buyItNowAuction;
    }

    public void setBuyItNowAuction(Boolean buyItNowAuction) {
        this.buyItNowAuction = buyItNowAuction;
    }

    public Boolean getVenueAddressBuyersFinancials() {
        return venueAddressBuyersFinancials;
    }

    public void setVenueAddressBuyersFinancials(Boolean venueAddressBuyersFinancials) {
        this.venueAddressBuyersFinancials = venueAddressBuyersFinancials;
    }

    public Boolean getVenueAddressVendorsFinancials() {
        return venueAddressVendorsFinancials;
    }

    public void setVenueAddressVendorsFinancials(Boolean venueAddressVendorsFinancials) {
        this.venueAddressVendorsFinancials = venueAddressVendorsFinancials;
    }

    public Boolean getVenueAddressNonFinancials() {
        return venueAddressNonFinancials;
    }

    public void setVenueAddressNonFinancials(Boolean venueAddressNonFinancials) {
        this.venueAddressNonFinancials = venueAddressNonFinancials;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public Set<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(Set<Stock> stocks) {
        this.stocks = stocks;
    }
}
