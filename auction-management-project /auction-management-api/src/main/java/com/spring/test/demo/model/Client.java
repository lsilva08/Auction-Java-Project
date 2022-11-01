package com.spring.test.demo.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.spring.test.demo.views.AuctionView;
import com.spring.test.demo.views.ClientView;
import com.spring.test.demo.views.StockView;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
//Map the database Entity and it relationships
public class Client {

    public Client() {}

    public Client(
            int id, String displayName, String title, String firstName, String lastName, String address, String town,
            String country, String postcode, String email, String phone)
    {
        this.id = id;
        this.displayName = displayName;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.town = town;
        this.country = country;
        this.postcode = postcode;
        this.email = email;
        this.phone = phone;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private int id;

    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    @Column(name = "display_name")
    private String displayName;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String title;

    @Column(name = "first_name")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String firstName;

    @Column(name = "last_name")
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String lastName;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String address;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String town;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String country;

    @Column
    @JsonView({StockView.Summary.class, ClientView.Summary.class, AuctionView.Summary.class})
    private String postcode;

    @Column
    @JsonView(ClientView.Summary.class)
    private String email;

    @Column
    @JsonView(ClientView.Summary.class)
    private String phone;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JsonView(ClientView.Summary.class)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Stock> stocks;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(Set<Stock> stocks) {
        this.stocks = stocks;
    }
}
