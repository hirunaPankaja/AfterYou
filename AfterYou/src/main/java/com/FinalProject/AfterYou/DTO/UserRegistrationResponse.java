package com.FinalProject.AfterYou.DTO;

import lombok.Data;

@Data
public class UserRegistrationResponse {
    private int userId;
    private String firstName;
    private String lastName;
    private String email;
    private String message;
}
