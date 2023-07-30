package com.prakash.swachhbharatbackend.services.implementation;

import com.prakash.swachhbharatbackend.configurations.JwtUtil;
import com.prakash.swachhbharatbackend.exceptions.AlreadyExistsException;
import com.prakash.swachhbharatbackend.models.*;
import com.prakash.swachhbharatbackend.repositories.RoleRepository;
import com.prakash.swachhbharatbackend.repositories.UserRepository;
import com.prakash.swachhbharatbackend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Override
    public User register(User user, boolean isDriver) throws IllegalArgumentException, AlreadyExistsException {
        if (user == null ||
                user.getName() == null || user.getName().isBlank() ||
                user.getUsername() == null || user.getUsername().isBlank() ||
                user.getPassword() == null || user.getPassword().isBlank() ||
                user.getMobNumber() == null || user.getMobNumber().isBlank() ||
                user.getAddress() == null || user.getAddress().isBlank())
            throw new IllegalArgumentException("Mandatory fields can't be empty!");

        else if (user.getPassword().length() < 8)
            throw new IllegalArgumentException("Password should be minimum 8 characters long!");

        else {
            User temp = userRepository.findByUsername(user.getUsername());
            if (temp != null) {
                throw new AlreadyExistsException("User already exists!");
            } else {
                Role role = null;
                Set<Role> userRoles = new HashSet<>();

                if (isDriver) {
                    role = roleRepository.findById("DRIVER_USER").isPresent() ? roleRepository.findById("DRIVER_USER").get() : null;
                    String[] pickupCities = new String[10];
                    user.setPickupCities(pickupCities);
                } else {
                    role = roleRepository.findById("NORMAL_USER").isPresent() ? roleRepository.findById("NORMAL_USER").get() : null;
                }
                userRoles.add(role);
                user.setRoles(userRoles);
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                return userRepository.save(user);
            }
        }
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) throws DisabledException, BadCredentialsException {
        authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(loginRequest.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        return new LoginResponse(userRepository.findByUsername(loginRequest.getUsername()), token);
    }

    private void authenticate(String username, String password) throws DisabledException, BadCredentialsException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new DisabledException("USER_DISABLED " + e.getMessage());
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("INVALID_CREDENTIALS " + e.getMessage());
        }
    }

}
