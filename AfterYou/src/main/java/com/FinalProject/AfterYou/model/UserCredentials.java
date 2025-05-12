package com.FinalProject.AfterYou.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table (name = "user_login_credentials")
public class UserCredentials {

    @Id
    private int id;

    private String email;
    private String password; // ✅ use lowercase 'password' (Java naming convention)
    private boolean verified = false;    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private UserRegistrationDetails user;
}
