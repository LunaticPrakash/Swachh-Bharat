package com.prakash.swachhbharatbackend.services.implementation;

import com.prakash.swachhbharatbackend.exceptions.NotFoundException;
import com.prakash.swachhbharatbackend.models.PickupLocation;
import com.prakash.swachhbharatbackend.repositories.PickupLocationRepository;
import com.prakash.swachhbharatbackend.services.PickupLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Stream;

@Service
public class PickupLocationServiceImpl implements PickupLocationService {

    private static final Logger LOGGER = Logger.getLogger(PickupLocationServiceImpl.class.getName());

    @Autowired
    private PickupLocationRepository pickupLocationRepository;

    @Override
    public PickupLocation addPickupLocation(PickupLocation pickupLocation) throws IllegalArgumentException, DateTimeParseException {
        if (Stream.of(pickupLocation.getLandmark(), pickupLocation.getStreet(),
                pickupLocation.getCity(), pickupLocation.getState(),
                pickupLocation.getCountry(), pickupLocation.getDateAdded(),
                pickupLocation.getUserId()).anyMatch((p) -> p == null || String.valueOf(p).isBlank())) {
            throw new IllegalArgumentException("Mandatory fields can't be empty!");
        } else if (pickupLocation.getDateCleaned() != null && !pickupLocation.getDateCleaned().isBlank()) {
            throw new IllegalArgumentException("Date Cleaned can be updated, only after adding the location first!");
        } else if (pickupLocation.isStatus()) {
            throw new IllegalArgumentException("Status can be set to true, only after adding the location first!");
        } else if (pickupLocation.getDriverId() != null && !String.valueOf(pickupLocation.getDriverId()).isBlank()) {
            throw new IllegalArgumentException("Driver ID can be set, only after adding the location first!");
        }

        DateTimeFormatter f = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        try {
            LocalDateTime.parse(pickupLocation.getDateAdded(), f);
        } catch (DateTimeParseException e) {
            throw new DateTimeParseException("Invalid Date Time, it can't be parsed! Error in ", e.getParsedString() + " at ", e.getErrorIndex());
        }

        return pickupLocationRepository.save(pickupLocation);
    }

    @Override
    public List<PickupLocation> getPickupLocation() {
        return pickupLocationRepository.findAll();
    }

    @Override
    public List<PickupLocation> getPickupLocationByUserId(Long userId) {
        return getPickupLocation().stream().filter(loc -> loc.getUserId().equals(userId)).toList();
    }

    @Override
    public List<PickupLocation> getPickupLocationByCities(String[] cities) {
        return getPickupLocation().stream().filter(loc -> Arrays.stream(cities).anyMatch(c -> c.equals(loc.getCity()))).toList();
    }

    @Override
    public PickupLocation updatePickupLocation(Long pickLocId, PickupLocation pickupLocation) throws NotFoundException, IllegalArgumentException, DateTimeParseException {
        Optional<PickupLocation> temp = pickupLocationRepository.findById(pickLocId);
        if (temp.isPresent()) {
            if (Stream.of(pickupLocation.getLandmark(), pickupLocation.getStreet(),
                    pickupLocation.getCity(), pickupLocation.getState(),
                    pickupLocation.getCountry(), pickupLocation.getDateAdded(),
                    pickupLocation.getUserId()).anyMatch((p) -> p == null || String.valueOf(p).isBlank())) {
                throw new IllegalArgumentException("Mandatory fields can't be empty!");
            }
            try {
                DateTimeFormatter f = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
                LocalDateTime dateAdded = LocalDateTime.parse(pickupLocation.getDateAdded(), f);
                if (pickupLocation.getDateCleaned() != null) {
                    LocalDateTime dateCleaned = LocalDateTime.parse(pickupLocation.getDateCleaned(), f);
                    if (!dateAdded.isBefore(dateCleaned))
                        throw new IllegalArgumentException("Date Cleaned can't be before Date Added!");
                }
                return pickupLocationRepository.save(pickupLocation);
            } catch (DateTimeParseException e) {
                throw new DateTimeParseException("Invalid Date Time, it can't be parsed! Error in ", e.getParsedString() + " at ", e.getErrorIndex());
            }
        } else {
            throw new NotFoundException("ERR_NOT_FOUND");
        }
    }

    @Override
    public void deletePickupLocation(Long pickLocId) throws NotFoundException {
        Optional<PickupLocation> pickupLocation = pickupLocationRepository.findById(pickLocId);
        if (pickupLocation.isPresent()) {
            pickupLocationRepository.delete(pickupLocation.get());
        } else {
            throw new NotFoundException("ERR_NOT_FOUND");
        }
    }
}
