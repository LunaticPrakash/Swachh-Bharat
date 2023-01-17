package com.prakash.swachhbharatbackend.services;

import com.prakash.swachhbharatbackend.SwachhBharatBackendApplication;
import com.prakash.swachhbharatbackend.exceptions.NotFoundException;
import com.prakash.swachhbharatbackend.models.PickupLocation;
import com.prakash.swachhbharatbackend.repositories.PickupLocationRepository;
import com.prakash.swachhbharatbackend.services.implementation.PickupLocationServiceImpl;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = {SwachhBharatBackendApplication.class})
public class PickupLocationServiceTest {
    @Mock
    private PickupLocationRepository pickupLocationRepository;
    @InjectMocks
    private PickupLocationServiceImpl pickupLocationService;
    private PickupLocation pickupLocation;

    @BeforeEach
    public void setupBeforeEach(){
        pickupLocation = PickupLocation.builder()
                .pickLocId(1L)
                .landmark("Near XYZ Tower")
                .street("ABC Road")
                .city("PQR city")
                .state("Uttar Pradesh")
                .country("India")
                .dateAdded("30-12-2022 19:35:00")
                .status(false)
                .userId(1L)
                .build();
    }
    @Order(0)
    @Test
    public void addPickupLocation_WithValidAttributes_AddsSuccessfully(){
        when(pickupLocationRepository.save(pickupLocation)).thenReturn(pickupLocation);
        assertSame(pickupLocation, pickupLocationService.addPickupLocation(pickupLocation));
    }

    @Order(1)
    @Test
    public void addPickupLocation_WithoutLandmark_ThrowsIllegalArgumentException() {
        pickupLocation.setLandmark(null);

        when(pickupLocationRepository.save(pickupLocation)).thenReturn(pickupLocation);
        assertThrows(IllegalArgumentException.class, ()-> pickupLocationService.addPickupLocation(pickupLocation));
    }

    @Order(2)
    @Test
    public void addPickupLocation_ProvidedDateCleaned_ThrowsIllegalArgumentException() {
        pickupLocation.setDateCleaned("31-12-2022 22:01:34");

        when(pickupLocationRepository.save(pickupLocation)).thenReturn(pickupLocation);
        assertThrows(IllegalArgumentException.class, ()-> pickupLocationService.addPickupLocation(pickupLocation));
    }

    @Order(3)
    @Test
    public void addPickupLocation_WithStatusAsTrue_ThrowsIllegalArgumentException() {
        pickupLocation.setStatus(true);

        when(pickupLocationRepository.save(pickupLocation)).thenReturn(pickupLocation);
        assertThrows(IllegalArgumentException.class, ()-> pickupLocationService.addPickupLocation(pickupLocation));
    }

    @Order(4)
    @Test
    public void addPickupLocation_InvalidDateAdded_ThrowsIllegalArgumentException() {
        pickupLocation.setDateAdded("32-13-2022 06:40:10");

        when(pickupLocationRepository.save(pickupLocation)).thenReturn(pickupLocation);
        assertThrows(DateTimeParseException.class, ()-> pickupLocationService.addPickupLocation(pickupLocation));
    }

    @Order(5)
    @Test
    public void addPickupLocation_WithDriverId_ThrowsIllegalArgumentException() {
        pickupLocation.setDriverId(2L);

        when(pickupLocationRepository.save(pickupLocation)).thenReturn(pickupLocation);
        assertThrows(IllegalArgumentException.class, ()-> pickupLocationService.addPickupLocation(pickupLocation));
    }

    @Order(6)
    @Test
    public void getPickupLocation_AllValid_ReturnsListOfPickupLocations() {
        List<PickupLocation> pickupLocations = new ArrayList<>();
        PickupLocation pickupLocation1 = PickupLocation.builder()
                .pickLocId(2L)
                .landmark("Near ABC Mandir")
                .street("PQR Road")
                .city("GHI city")
                .state("Mumbai")
                .country("India")
                .dateAdded("31-12-2022 08:45:00")
                .status(false)
                .userId(2L)
                .driverId(2L)
                .build();

        pickupLocations.add(pickupLocation);
        pickupLocations.add(pickupLocation1);

        when(pickupLocationRepository.findAll()).thenReturn(pickupLocations);
        assertAll(() -> assertIterableEquals(pickupLocations, pickupLocationService.getPickupLocation()),
                ()-> assertEquals(2, pickupLocationService.getPickupLocation().size()));
    }

    @Order(7)
    @Test
    public void updatePickupLocation_ValidInput_ReturnsUpdatedPickupLocation() throws NotFoundException {
        PickupLocation updatedPickupLocation = PickupLocation.builder()
                .pickLocId(1L)
                .landmark("Near ABC Mandir")
                .street("PQR Road")
                .city("GHI city")
                .state("Mumbai")
                .country("India")
                .dateAdded("31-12-2022 08:45:00")
                .dateCleaned("01-01-2023 06:40:10")
                .status(true)
                .userId(2L)
                .driverId(2L)
                .build();

        when(pickupLocationRepository.findById(updatedPickupLocation.getPickLocId())).thenReturn(Optional.of(pickupLocation));
        when(pickupLocationRepository.save(updatedPickupLocation)).thenReturn(updatedPickupLocation);

        assertSame(updatedPickupLocation, pickupLocationService.updatePickupLocation(updatedPickupLocation.getPickLocId() , updatedPickupLocation));
    }

    @Order(8)
    @Test
    public void updatePickupLocation_WrongCleanedDate_ThrowsIllegalArgumentException() {
        PickupLocation updatedPickupLocation = PickupLocation.builder()
                .pickLocId(1L)
                .landmark("Near ABC Mandir")
                .street("PQR Road")
                .city("GHI city")
                .state("Mumbai")
                .country("India")
                .dateAdded("31-12-2022 08:45:00")
                .dateCleaned("30-12-2022 06:40:10")
                .status(true)
                .userId(2L)
                .driverId(2L)
                .build();

        when(pickupLocationRepository.findById(updatedPickupLocation.getPickLocId())).thenReturn(Optional.of(pickupLocation));
        when(pickupLocationRepository.save(updatedPickupLocation)).thenReturn(updatedPickupLocation);

        assertThrows(IllegalArgumentException.class, ()->pickupLocationService.updatePickupLocation(updatedPickupLocation.getPickLocId(), updatedPickupLocation));
    }

    @Order(9)
    @Test
    public void updatePickupLocation_InvalidCleanedDate_ThrowsDateTimeParseException() {
        PickupLocation updatedPickupLocation = PickupLocation.builder()
                .pickLocId(1L)
                .landmark("Near ABC Mandir")
                .street("PQR Road")
                .city("GHI city")
                .state("Mumbai")
                .country("India")
                .dateAdded("31-12-2022 08:45:00")
                .dateCleaned("32-12-2022 06:40:10")
                .status(true)
                .userId(2L)
                .driverId(2L)
                .build();

        when(pickupLocationRepository.findById(updatedPickupLocation.getPickLocId())).thenReturn(Optional.of(pickupLocation));
        when(pickupLocationRepository.save(updatedPickupLocation)).thenReturn(updatedPickupLocation);

        assertThrows(DateTimeParseException.class, ()->pickupLocationService.updatePickupLocation(updatedPickupLocation.getPickLocId(), updatedPickupLocation));
    }

    @Order(10)
    @Test
    public void updatePickupLocation_WrongPickLocId_ThrowsNotFoundException() {
        PickupLocation updatedPickupLocation = PickupLocation.builder()
                .pickLocId(3L)
                .landmark("Near ABC Mandir")
                .street("PQR Road")
                .city("GHI city")
                .state("Mumbai")
                .country("India")
                .dateAdded("31-12-2022 08:45:00")
                .dateCleaned("30-12-2022 06:40:10")
                .status(true)
                .userId(2L)
                .driverId(2L)
                .build();

        when(pickupLocationRepository.findById(updatedPickupLocation.getPickLocId())).thenReturn(Optional.empty());
        when(pickupLocationRepository.save(updatedPickupLocation)).thenReturn(null);

        assertThrows(NotFoundException.class, ()->pickupLocationService.updatePickupLocation(updatedPickupLocation.getPickLocId(), updatedPickupLocation));
    }

    @Order(11)
    @Test
    public void updatePickupLocation_WithoutCity_ThrowsIllegalArgumentException() {
        PickupLocation updatedPickupLocation = PickupLocation.builder()
                .pickLocId(1L)
                .landmark("Near ABC Mandir")
                .street("PQR Road")
                .city("")
                .state("Mumbai")
                .country("India")
                .dateAdded("31-12-2022 08:45:00")
                .dateCleaned("30-12-2022 06:40:10")
                .status(true)
                .userId(2L)
                .driverId(2L)
                .build();

        when(pickupLocationRepository.findById(pickupLocation.getPickLocId())).thenReturn(Optional.of(pickupLocation));
        assertThrows(IllegalArgumentException.class, ()-> pickupLocationService.updatePickupLocation(updatedPickupLocation.getPickLocId(), updatedPickupLocation));
    }

    @Order(12)
    @Test
    public void deletePickupLocation_ValidInput_DeletedSuccessfully() throws NotFoundException {
        Long pickLocId = 1L;
        when(pickupLocationRepository.findById(pickLocId)).thenReturn(Optional.of(pickupLocation));
        pickupLocationService.deletePickupLocation(pickLocId);
        verify(pickupLocationRepository, times(1)).delete(pickupLocation);
    }

    @Order(13)
    @Test
    public void deletePickupLocation_WrongPickLocId_ThrowsNotFoundException() throws NotFoundException {
        Long pickLocId = 2L;
        when(pickupLocationRepository.findById(pickLocId)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, ()-> pickupLocationService.deletePickupLocation(pickLocId));
    }
}
