package com.intern.work.Assignment.service;

import com.intern.work.Assignment.entity.User;
import com.intern.work.Assignment.model.*;
import com.intern.work.Assignment.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;


    public UserServiceImpl(UserRepository userRepository){
        this.userRepository= userRepository;
    }
    public boolean isUsernameExists(String userName){
        return userRepository.existsByusername(userName);
    }
    public boolean isEmailExists(String email){
        return userRepository.existsByEmail(email);
    }
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    @Override
    public ResponseEntity<String> registerUser(String path,
                                               UserRequest userRequest,
                                               MultipartFile file) throws IOException {
        //to check if any field is empty
        if(userRequest.getFirstName() ==null ||
                userRequest.getLastName() ==null ||
                userRequest.getContact() ==null||
                userRequest.getDob() ==null ||
                userRequest.getUsername() ==null ||
                userRequest.getEmail() ==null ||
                userRequest.getPassword() ==null
        ){
            System.out.println("Fields cannot be empty");
            return new ResponseEntity<>("Fields cannot be empty", HttpStatus.NOT_ACCEPTABLE);
        }
        //to check if username exists
        else if (isUsernameExists(userRequest.getUsername())== true) {
            return new ResponseEntity<>("Username already exists",HttpStatus.NOT_ACCEPTABLE);
        }
        //to check if email already exists
        else if (isEmailExists(userRequest.getEmail())== true) {
            return new ResponseEntity<>("Email already exists",HttpStatus.NOT_ACCEPTABLE);
        }
        else{
            //Data Processing
            //setting id if id is null
            if( userRequest.getId()==null){
                userRequest.setId(UUID.randomUUID().toString());
            }

            //Encrypting the password
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
            String encodedPassword = encoder.encode(userRequest.getPassword());

            //File Processing
            try{
                String fileName = file.getOriginalFilename();
                String filePath = path + File.separator+fileName;

                File f = new File(path);
                if(!f.exists()){
                    f.mkdir();
                }

                Files.copy(file.getInputStream(), Paths.get(filePath));


                String finalPath = "C:\\Users\\user\\Desktop\\project\\Java-Assignment\\Assignment\\images";
                String fileWithName= finalPath + fileName;
                //Saving into database
                User user = User.builder()
                        .id(userRequest.getId())
                        .firstName(userRequest.getFirstName())
                        .lastName(userRequest.getLastName())
                        .contact(userRequest.getContact())
                        .dob(userRequest.getDob())
                        .email(userRequest.getEmail())
                        .username(userRequest.getUsername())
                        .password(encodedPassword)
                        .photo(fileWithName)
                        .build();
                userRepository.save(user);
                return new ResponseEntity<>("User registered successfully",HttpStatus.OK);
            }
            catch(FileAlreadyExistsException e){

                return new ResponseEntity<>("File already exist",HttpStatus.NOT_ACCEPTABLE);
            }
        }
        }

    @Override
    public ResponseEntity<LoginResponse> login(LoginRequest loginRequest) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        String encodedPassword = encoder.encode(loginRequest.getPassword());
        User user = getUserByUsername(loginRequest.getUsername());
        System.out.println(user);

        if (isUsernameExists(loginRequest.getUsername())== false) {
            return new ResponseEntity<>(new LoginResponse(null,"Username doesnot exist"),HttpStatus.NOT_ACCEPTABLE);
        }
        else if(isUsernameExists(loginRequest.getUsername())== true && encoder.matches(loginRequest.getPassword(), user.getPassword())==true){
            System.out.println("Correct");
            return new ResponseEntity<>(new LoginResponse(user.getId(), user.getUsername()),HttpStatus.OK);

        }
        return null;
    }

    @Override
    public UserResponse getUserById(String id) {
        User user =userRepository.findById(id).get();
        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(user,userResponse);
        return userResponse;
    }

    @Override
    public ResponseEntity<UpdateResponse> updateUserName(UserRequest userRequest) {
        User user = userRepository.findById(userRequest.getId()).get();

        if (isUsernameExists(userRequest.getUsername())== true) {
            return new ResponseEntity<>(new UpdateResponse("Username already exists! Try other"), HttpStatus.BAD_REQUEST);
        } else{
            user.setUsername(userRequest.getUsername());
            userRepository.save(user);
            return new ResponseEntity<>(new UpdateResponse("Successfully Changed"),HttpStatus.OK);
            }
    }

    @Override
    public ResponseEntity<UpdateResponse> updatePassword(UserRequest userRequest) {

        System.out.println(userRequest);
        //Check if user exists or not
        User user = userRepository.findById(userRequest.getId()).get();

        //Encrypting the password
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        String result = encoder.encode(userRequest.getPassword());
        String newResult = encoder.encode(userRequest.getNewPassword());

        //Check if the existing password matches with the user sent password
        if(!encoder.matches(userRequest.getPassword(), user.getPassword())){
            return new ResponseEntity<>(new UpdateResponse("Your recent password doesnot match"),HttpStatus.NOT_ACCEPTABLE);
        }

        else if (encoder.matches(userRequest.getNewPassword(), user.getPassword())) {
            return new ResponseEntity<>(new UpdateResponse("This is your old password"),HttpStatus.NOT_ACCEPTABLE);
        }
        else{
            user.setPassword(newResult);
            userRepository.save(user);

            return new ResponseEntity<>(new UpdateResponse("Password updated successfully"),HttpStatus.OK);
        }

    }

    @Override
    public ResponseEntity<UpdateResponse> updateContact(UserRequest userRequest) {
        User user = userRepository.findById(userRequest.getId()).get();
        user.setContact(userRequest.getContact());
        userRepository.save(user);
        return new ResponseEntity<>(new UpdateResponse("Successfully Changed"),HttpStatus.OK);
    }
}
