package com.intern.work.Assignment.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user_table")
@Builder
public class User {
    @Id
    private String id;
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="contact")
    private String contact;
    @Column(name="email")
    private String email;
    @Column(name="dob")
    private String dob;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;
    @Column(name="photo")
    private String photo;
}
