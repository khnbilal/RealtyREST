package com.realestate.realtyrest;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "RealEstate")
@Data
public class Realty {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "location")
    private String location; 

    @Column(name = "houseFlatNo")
    private String houseFlatNo; 

    @Column(name = "building")
    private String building; 

    @Column(name = "locality")
    private String locality; 

    @Column(name = "listingDate")
    private LocalDate listingDate;

    @Column(name = "propertyType")
    private String propertyType;

    @Column(name = "bedroom")
    private int numberOfBedrooms;

    @Column(name = "bathroom")
    private int numberOfBathrooms;

    @Column(name = "homeSize")
    private float homeSize;

    @Column(name = "price")
    private Double price;

    @Lob // This annotation is for storing large objects
    @Column(name = "propertyImage")
    private byte[] propertyImage; // Field for storing image data

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;
}

