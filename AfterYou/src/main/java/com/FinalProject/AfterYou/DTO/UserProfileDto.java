package com.FinalProject.AfterYou.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class UserProfileDto {
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String NIC;
    private String address;
    private Date DOB;
    private String phoneNumber;



    public UserProfileDto(String firstName, String lastName, String email, String gender, Date DOB , String address, String phoneNumber, String NIC ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.NIC = NIC;
        this.DOB = DOB;
        this.address = address;
        this.phoneNumber = phoneNumber;

    }

    // Getters and Setters
}
