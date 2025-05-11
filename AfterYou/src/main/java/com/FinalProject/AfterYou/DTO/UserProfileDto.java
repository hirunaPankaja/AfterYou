package com.FinalProject.AfterYou.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserProfileDto {
    private String firstName;
    private String lastName;
    private String email;

    public UserProfileDto(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    // Getters and Setters
}
