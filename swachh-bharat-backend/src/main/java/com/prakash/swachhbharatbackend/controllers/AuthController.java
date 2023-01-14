package com.prakash.swachhbharatbackend.controllers;

import com.prakash.swachhbharatbackend.exceptions.AlreadyExistsException;
import com.prakash.swachhbharatbackend.models.DriverUser;
import com.prakash.swachhbharatbackend.models.LoginRequest;
import com.prakash.swachhbharatbackend.models.NormalUser;
import com.prakash.swachhbharatbackend.services.implementation.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger LOGGER = Logger.getLogger(AuthController.class.getName());
    @Autowired
    private AuthServiceImpl authService;

    @PostMapping(value = "/register-normal-user")
    public ResponseEntity<?> registerUser(@RequestBody NormalUser normalUser) {
        try {
            authService.register(normalUser);
        } catch (AlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(normalUser);
    }

    @PostMapping(value = "/register-driver-user")
    public ResponseEntity<?> registerUser(@RequestBody DriverUser driverUser) {
        try {
            authService.register(driverUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(driverUser);
        } catch (AlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(authService.login(loginRequest));
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


//    @GetMapping("/get-driver-user/{driverId}")
//    public User getDriverUser(@PathVariable Long driverId) throws Exception {
//        User temp = userRepository.findById(driverId).isPresent() ? userRepository.findById(driverId).get() : null;
//        Role driverRole = roleRepository.findById("DRIVER_USER").isPresent() ? roleRepository.findById("DRIVER_USER").get() : null;
//        if(temp != null)
//            temp.getRoles().forEach(r -> System.out.println(r.getRoleName()));
//
//        if (temp != null && temp.getRoles().stream().noneMatch(r -> r.getRoleName().equals("DRIVER_USER"))) {
//            throw new Exception("User Doesn't Exists");
//        } else {
//            return temp;
//        }
//    }
}