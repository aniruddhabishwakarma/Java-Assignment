package com.intern.work.Assignment.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.intern.work.Assignment.model.*;
import com.intern.work.Assignment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String id){
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/update/username")
    public ResponseEntity<UpdateResponse> updateUserName(@RequestBody UserRequest userRequest){
        return  userService.updateUserName(userRequest);

    }
    @PutMapping("update/password")
    public ResponseEntity<UpdateResponse> updatePassword(@RequestBody UserRequest userRequest){
        return userService.updatePassword(userRequest);
    }
    @PutMapping("update/contact")
    public ResponseEntity<UpdateResponse> updateContact(@RequestBody UserRequest userRequest){
        return userService.updateContact(userRequest);
    }
}
