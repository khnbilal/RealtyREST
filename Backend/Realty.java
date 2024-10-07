package com.realestate.realtyrest;

import jakarta.persistence.*;
import lombok.Data; // Import Lombok Data annotation
import java.time.LocalDate;

@Entity
@Table(name = "RealEstate")
@Data // Automatically generates getters, setters, and constructors
public class Realty {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="address")
    private String address;

    @Column(name="listingDate")
    private LocalDate listingDate;

    @Column(name="propertyType")
    private String propertyType;

    @Column(name="bedroom")
    private int numberOfBedrooms; // Updated field name

    @Column(name="bathroom")
    private int numberOfBathrooms; // Updated field name

    @Column(name="homeSize")
    private float homeSize;
}
