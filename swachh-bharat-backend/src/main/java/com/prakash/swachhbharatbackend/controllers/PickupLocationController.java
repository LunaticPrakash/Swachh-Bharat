package com.prakash.swachhbharatbackend.controllers;

import com.prakash.swachhbharatbackend.exceptions.NotFoundException;
import com.prakash.swachhbharatbackend.models.PickupLocation;
import com.prakash.swachhbharatbackend.services.PickupLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeParseException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/pickup-location")
public class PickupLocationController {

    @Autowired
    private PickupLocationService pickupLocationService;

    @PostMapping("/")
    public ResponseEntity<?> addPickupLocation(@RequestBody PickupLocation pickupLocation) {
        try {
            pickupLocationService.addPickupLocation(pickupLocation);
            return ResponseEntity.status(HttpStatus.OK).body(pickupLocation);
        } catch (IllegalArgumentException | DateTimeParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getPickupLocation() {
        try {
            List<PickupLocation> pickupLocations = pickupLocationService.getPickupLocation();
            return ResponseEntity.status(HttpStatus.OK).body(pickupLocations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getPickupLocationByUserId(@PathVariable Long userId) {
        try {
            List<PickupLocation> pickupLocations = pickupLocationService.getPickupLocationByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(pickupLocations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{pickLocId}")
    public ResponseEntity<?> updatePickupLocation(@RequestBody PickupLocation pickupLocation, @PathVariable Long pickLocId) {
        try {
            pickupLocationService.updatePickupLocation(pickLocId, pickupLocation);
            return ResponseEntity.status(HttpStatus.OK).body(pickupLocation);
        } catch (IllegalArgumentException | DateTimeParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{pickLocId}")
    public ResponseEntity<?> deletePickupLocation(@PathVariable Long pickLocId) {
        try {
            pickupLocationService.deletePickupLocation(pickLocId);
            return ResponseEntity.status(HttpStatus.OK).body("Deleted");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
