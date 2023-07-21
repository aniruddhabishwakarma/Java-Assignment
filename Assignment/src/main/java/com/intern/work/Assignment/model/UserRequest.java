package com.intern.work.Assignment.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String id;
    private String firstName;
    private String lastName;
    private String contact;
    private String email;
    private String dob;
    private String username;
    private String password;

}
