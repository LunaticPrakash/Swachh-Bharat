package com.prakash.swachhbharatbackend.services;

import com.prakash.swachhbharatbackend.exceptions.NotFoundException;
import com.prakash.swachhbharatbackend.models.User;

public interface UserProfileService {
    
    User updateUserProfile(User user) throws NotFoundException, IllegalArgumentException;
}
