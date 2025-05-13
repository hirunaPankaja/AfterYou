package com.FinalProject.AfterYou.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
@Setter
@Getter
@Entity
@Table(name = "user_basic_info")
@NoArgsConstructor  // Generates no-arg constructor
@AllArgsConstructor // Generates all-arg constructor
public class UserRegistrationDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ✅ Let DB generate userId
    private int userId;

    private String firstName;
    private String lastName;
    private Date DOB;
    private String phoneNumber;
    private String nationality;
    private String address;
    private String gender;
    private String emergencyNumber;
    private byte [] profilePic;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private UserCredentials credentials;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private UserAccountSecurity accountSecurity;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private UserIdentity userIdentity;

}
