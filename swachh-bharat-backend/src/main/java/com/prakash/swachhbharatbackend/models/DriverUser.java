package com.prakash.swachhbharatbackend.models;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Setter
@Getter
@Entity
@DiscriminatorValue("DRIVER_USER")
public class DriverUser extends User {

    @Column(name = "pickup_cities")
    private String[] pickupCities;
}