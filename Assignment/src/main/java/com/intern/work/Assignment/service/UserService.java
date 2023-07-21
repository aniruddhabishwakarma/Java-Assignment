package com.intern.work.Assignment.service;

import com.intern.work.Assignment.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface UserService {
    ResponseEntity<String> registerUser(String path, UserRequest userRequest, MultipartFile file) throws IOException;

    ResponseEntity<LoginResponse> login(LoginRequest loginRequest);

    UserResponse getUserById(String id);

    ResponseEntity<UpdateResponse> updateUserName(UserRequest userRequest);

    ResponseEntity<UpdateResponse> updatePassword(UserRequest userRequest);
}
