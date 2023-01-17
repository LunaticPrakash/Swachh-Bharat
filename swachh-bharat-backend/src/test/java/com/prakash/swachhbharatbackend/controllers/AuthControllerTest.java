package com.prakash.swachhbharatbackend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prakash.swachhbharatbackend.SwachhBharatBackendApplication;
import com.prakash.swachhbharatbackend.exceptions.AlreadyExistsException;
import com.prakash.swachhbharatbackend.models.DriverUser;
import com.prakash.swachhbharatbackend.models.NormalUser;
import com.prakash.swachhbharatbackend.services.implementation.AuthServiceImpl;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.logging.Logger;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SpringBootTest(classes = {SwachhBharatBackendApplication.class})
public class AuthControllerTest {

    @Mock
    private AuthServiceImpl authService;
    @InjectMocks
    private AuthController authController;
    private MockMvc mockMvc;

    private static final Logger LOGGER = Logger.getLogger(AuthControllerTest.class.getName());


    @BeforeEach
    public void setupBeforeEach() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

//    @Order(0)
//    @Test
//    public void registerUser_ValidNormalUser_RegisterSuccessfully() throws Exception {
//        NormalUser normalUser = new NormalUser();
//        normalUser.setUserId(1L);
//        normalUser.setName("Test User");
//        normalUser.setUsername("test@gmail.com");
//        normalUser.setPassword("12345678");
//        normalUser.setMobNumber("1234567890");
//        normalUser.setAddress("Abc, UP, India");
//        normalUser.setCoinsEarned("1");
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        String jsonNormalUser = objectMapper.writeValueAsString(normalUser);
//
//        when(authService.register(normalUser)).thenReturn(normalUser);
//
//        ResultActions response = mockMvc.perform(post("/api/auth/register-normal-user")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(jsonNormalUser));
//
//        response.andExpect(status().isCreated());
//    }
//
//    @Order(1)
//    @Test
//    public void registerUser_ValidDriverUser_RegisterSuccessfully() throws Exception {
//        DriverUser driverUser = new DriverUser();
//        driverUser.setUserId(1L);
//        driverUser.setName("Test User");
//        driverUser.setUsername("test@gmail.com");
//        driverUser.setPassword("12345678");
//        driverUser.setMobNumber("1234567890");
//        driverUser.setAddress("Abc, UP, India");
//        driverUser.setCoinsEarned("1");
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        String jsonDriverUser = objectMapper.writeValueAsString(driverUser);
//
//        when(authService.register(driverUser)).thenReturn(driverUser);
//
//        ResultActions response = mockMvc.perform(post("/api/auth/register-driver-user")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(jsonDriverUser));
//
//        response.andExpect(status().isCreated())
//                .andExpect(content().json(jsonDriverUser));
//    }
//
//    @Order(2)
//    @Test
//    public void registerUser_AlreadyNormalUserExist_ThrowsAlreadyExistsException() throws Exception {
//        NormalUser normalUser = new NormalUser();
//        ObjectMapper objectMapper = new ObjectMapper();
//        String jsonNormalUser = objectMapper.writeValueAsString(normalUser);
//
//        LOGGER.info("start");
//        when(authService.register(normalUser)).thenThrow(AlreadyExistsException.class);
//
//        ResultActions response = mockMvc.perform(post("/api/auth/register-normal-user")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(jsonNormalUser));
//
//        response.andExpect(status().isConflict());
//    }
//
//    @Order(3)
//    @Test
//    public void registerUser_AlreadyDriverUserExist_ThrowsAlreadyExistsException() throws Exception {
//        DriverUser driverUser = new DriverUser();
//        driverUser.setUserId(1L);
//        driverUser.setName("Test User");
//        driverUser.setUsername("test@gmail.com");
//        driverUser.setPassword("12345678");
//        driverUser.setMobNumber("1234567890");
//        driverUser.setAddress("Abc, UP, India");
//        driverUser.setCoinsEarned("1");
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        String jsonNormalUser = objectMapper.writeValueAsString(driverUser);
//
//        when(authService.register(driverUser)).thenThrow(AlreadyExistsException.class);
//
//        ResultActions response = mockMvc.perform(post("/api/auth/register-driver-user")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(jsonNormalUser));
//
//        response.andExpect(status().isConflict());
//    }
}
