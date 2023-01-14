package com.prakash.swachhbharatbackend.repositories;

import com.prakash.swachhbharatbackend.models.PickupLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickupLocationRepository extends JpaRepository<PickupLocation, Long> {
}
