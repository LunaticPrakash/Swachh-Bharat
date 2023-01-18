package com.prakash.swachhbharatbackend.services;

import com.prakash.swachhbharatbackend.exceptions.NotFoundException;
import com.prakash.swachhbharatbackend.models.PickupLocation;

import java.time.format.DateTimeParseException;
import java.util.List;

public interface PickupLocationService {

    PickupLocation addPickupLocation(PickupLocation pickupLocation) throws IllegalArgumentException, DateTimeParseException;

    List<PickupLocation> getPickupLocation();

    List<PickupLocation> getPickupLocationByUserId(Long userId);

    List<PickupLocation> getPickupLocationByCities(String[] cities);

    PickupLocation updatePickupLocation(Long pickLocId, PickupLocation pickupLocation) throws NotFoundException, IllegalArgumentException, DateTimeParseException;

    void deletePickupLocation(Long pickLocId) throws NotFoundException;

}
