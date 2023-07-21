package com.intern.work.Assignment.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String firstName;
    private String lastName;
    private String contact;
    private String email;
    private String dob;
    private String username;
    private String password;
    private String photo;
    private String message;

    public UserResponse(String message){
        this.message = message;
    }
}
