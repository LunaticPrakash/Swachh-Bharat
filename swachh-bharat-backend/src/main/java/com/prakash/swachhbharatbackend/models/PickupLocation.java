package com.prakash.swachhbharatbackend.models;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Entity
@Table(name = "pickup_locations")
public class PickupLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pickup_location_id")
    private long pickLocId;

    @Column(name = "landmark", nullable = false)
    private String landmark;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "city", nullable = false, length = 60)
    private String city;

    @Column(name = "state", nullable = false, length = 60)
    private String state;

    @Column(name = "country", nullable = false, length = 50)
    private String country;

    @Column(name = "date_added", nullable = false, length = 30)
    private String dateAdded;

    @Column(name = "date_cleaned", length = 30)
    private String dateCleaned;

    @Column(name = "status", nullable = false, columnDefinition = "bit default 0")
    private boolean status;

//    @Column(name = "image", nullable = false)
//    @Lob
//    private byte[] image;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "driver_id")
    private Long driverId;
}
