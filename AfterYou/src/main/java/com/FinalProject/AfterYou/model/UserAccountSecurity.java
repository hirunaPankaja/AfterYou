package com.FinalProject.AfterYou.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Setter
@Getter
@Table(name = "user_account_security")
public class UserAccountSecurity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String securityQuestion;
    private String securityAnswer;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private UserRegistrationDetails user;
}
