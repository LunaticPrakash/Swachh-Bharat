package com.prakash.swachhbharatbackend.services;

import com.prakash.swachhbharatbackend.SwachhBharatBackendApplication;
import com.prakash.swachhbharatbackend.exceptions.NotFoundException;
import com.prakash.swachhbharatbackend.models.User;
import com.prakash.swachhbharatbackend.repositories.UserRepository;
import com.prakash.swachhbharatbackend.services.implementation.UserProfileServiceImpl;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = {SwachhBharatBackendApplication.class})

public class UserProfileServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private UserProfileServiceImpl userProfileService;
    private User user;

    @BeforeEach
    public void setupBeforeEach(){
        user = User.builder()
                .userId(1L)
                .name("Test User")
                .username("test@gmail.com")
                .password("12345678")
                .mobNumber("1234567890")
                .address("Abc Colony, UP, India")
                .coinsEarned("10")
                .build();
    }

    @Order(1)
    @Test
    public void updateUserProfile_WithValidAttributes_UpdatesSuccessfully() throws NotFoundException, IllegalArgumentException {
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(passwordEncoder.encode(user.getPassword())).thenReturn(user.getPassword());
        assertSame(user, userProfileService.updateUserProfile(user));
    }

    @Order(2)
    @Test
    public void updateUserProfile_WithoutAddress_ThrowsIllegalArgumentException() throws NotFoundException, IllegalArgumentException {
        user.setAddress(null);
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(passwordEncoder.encode(user.getPassword())).thenReturn(user.getPassword());
        assertThrows(IllegalArgumentException.class, ()->userProfileService.updateUserProfile(user));
    }

    @Order(3)
    @Test
    public void updateUserProfile_WithInvalidPassword_ThrowsIllegalArgumentException() throws NotFoundException, IllegalArgumentException {
        user.setPassword("1234");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(passwordEncoder.encode(user.getPassword())).thenReturn(user.getPassword());
        assertThrows(IllegalArgumentException.class, ()->userProfileService.updateUserProfile(user));
    }

    @Order(4)
    @Test
    public void updateUserProfile_WithInvalidUserId_ThrowsNotFoundException() throws NotFoundException, IllegalArgumentException {
        user.setUserId(2L);
        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
        when(passwordEncoder.encode(user.getPassword())).thenReturn(user.getPassword());
        assertThrows(NotFoundException.class, ()->userProfileService.updateUserProfile(user));
    }


}
