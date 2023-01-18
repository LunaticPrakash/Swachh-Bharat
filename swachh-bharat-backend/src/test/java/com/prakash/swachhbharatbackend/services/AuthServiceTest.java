package com.prakash.swachhbharatbackend.services;

import com.prakash.swachhbharatbackend.SwachhBharatBackendApplication;
import com.prakash.swachhbharatbackend.exceptions.AlreadyExistsException;
import com.prakash.swachhbharatbackend.models.Role;
import com.prakash.swachhbharatbackend.models.User;
import com.prakash.swachhbharatbackend.repositories.RoleRepository;
import com.prakash.swachhbharatbackend.repositories.UserRepository;
import com.prakash.swachhbharatbackend.services.implementation.AuthServiceImpl;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = {SwachhBharatBackendApplication.class})
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private AuthServiceImpl authService;
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

    @Order(0)
    @Test
    public void register_NormalUserWithValidAttributes_AddsSuccessfully() throws Exception {
        Role role = new Role("NORMAL_USER", "User who will upload the garbage location");

        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
        when(roleRepository.findById("NORMAL_USER")).thenReturn(Optional.of(role));
        when(userRepository.save(user)).thenReturn(user);
        boolean isDriver = false;

        assertSame(user, authService.register(user, isDriver));
    }

    @Order(1)
    @Test
    public void register_DriverUserWithValidAttributes_AddsSuccessfully() throws Exception {
        Role role = new Role("DRIVER_USER", "User who will pickup the garbage from location");

        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
        when(roleRepository.findById("DRIVER_USER")).thenReturn(Optional.of(role));
        when(passwordEncoder.encode(user.getPassword())).thenReturn(user.getPassword());
        when(userRepository.save(user)).thenReturn(user);
        boolean isDriver = true;

        assertSame(user, authService.register(user, isDriver));
    }

    @Order(2)
    @Test
    public void register_NormalUserWithoutName_ThrowsIllegalArgumentException() throws Exception {
        Role role = new Role("NORMAL_USER", "User who will upload the garbage location");
        user.setName(null);

        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
        when(roleRepository.findById("NORMAL_USER")).thenReturn(Optional.of(role));
        when(userRepository.save(user)).thenReturn(user);
        boolean isDriver = false;

        assertThrows(IllegalArgumentException.class, ()->authService.register(user, isDriver));
    }

    @Order(3)
    @Test
    public void register_DriverUserWithoutName_ThrowsIllegalArgumentException() throws Exception {
        Role role = new Role("DRIVER_USER", "User who will pickup the garbage from location");
        user.setName(null);

        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
        when(roleRepository.findById("DRIVER_USER")).thenReturn(Optional.of(role));
        when(userRepository.save(user)).thenReturn(user);
        boolean isDriver = true;

        assertThrows(IllegalArgumentException.class, ()->authService.register(user, isDriver));
    }

    @Order(4)
    @Test
    public void register_NormalUserInvalidPassword_ThrowsIllegalArgumentException() throws Exception {
        Role role = new Role("NORMAL_USER", "User who will upload the garbage location");
        user.setPassword("12345");

        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
        when(roleRepository.findById("NORMAL_USER")).thenReturn(Optional.of(role));
        when(userRepository.save(user)).thenReturn(user);
        boolean isDriver = false;

        assertThrows(IllegalArgumentException.class, ()->authService.register(user, isDriver));
    }

    @Order(5)
    @Test
    public void register_DriverUserInvalidPassword_ThrowsIllegalArgumentException() throws Exception {
        Role role = new Role("DRIVER_USER", "User who will upload the garbage location");
        user.setPassword("12345");

        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);
        when(roleRepository.findById("DRIVER_USER")).thenReturn(Optional.of(role));
        when(userRepository.save(user)).thenReturn(user);
        boolean isDriver = true;

        assertThrows(IllegalArgumentException.class, ()->authService.register(user, isDriver));
    }

    @Order(6)
    @Test
    public void register_NormalUserAlreadyExists_ThrowsAlreadyExistsException() throws Exception{
        Role role = new Role("DRIVER_USER", "User who will upload the garbage location");

        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(roleRepository.findById("DRIVER_USER")).thenReturn(Optional.of(role));
        when(userRepository.save(user)).thenReturn(user);
        boolean isDriver = false;

        assertThrows(AlreadyExistsException.class, ()->authService.register(user, isDriver));
    }

    @Order(7)
    @Test
    public void register_DriverUserAlreadyExists_ThrowsAlreadyExistsException() throws Exception{
        Role role = new Role("NORMAL_USER", "User who will upload the garbage location");

        when(userRepository.findByUsername(user.getUsername())).thenReturn(user);
        when(roleRepository.findById("NORMAL_USER")).thenReturn(Optional.of(role));
        when(userRepository.save(user)).thenReturn(user);
        boolean isDriver = true;

        assertThrows(AlreadyExistsException.class, ()->authService.register(user, isDriver));
    }

}
