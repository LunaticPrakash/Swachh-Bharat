package com.prakash.swachhbharatbackend.services;

import com.prakash.swachhbharatbackend.exceptions.AlreadyExistsException;
import com.prakash.swachhbharatbackend.models.LoginRequest;
import com.prakash.swachhbharatbackend.models.LoginResponse;
import com.prakash.swachhbharatbackend.models.User;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;

public interface AuthService {


    User register(User user) throws IllegalArgumentException, AlreadyExistsException;

    LoginResponse login(LoginRequest loginRequest) throws DisabledException, BadCredentialsException;
}
