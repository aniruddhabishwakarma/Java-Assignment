package com.intern.work.Assignment.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.intern.work.Assignment.model.LoginRequest;
import com.intern.work.Assignment.model.LoginResponse;
import com.intern.work.Assignment.model.UserRequest;
import com.intern.work.Assignment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private ObjectMapper mapper;

    @Value("${project.image}")
    private String path;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam("user") String user,
                                               @RequestParam("file") MultipartFile file) throws IOException {


        UserRequest userRequest = mapper.readValue(user,UserRequest.class);


        return userService.registerUser(path,userRequest,file);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){

        return userService.login(loginRequest);
    }
}
