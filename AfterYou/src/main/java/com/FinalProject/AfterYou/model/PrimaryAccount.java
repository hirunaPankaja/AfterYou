package com.FinalProject.AfterYou.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Table(name = "primary_accounts")
@NoArgsConstructor
@AllArgsConstructor
public class PrimaryAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long primaryId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserRegistrationDetails user;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private String recoveryCode;

    public PrimaryAccount(UserRegistrationDetails user, String email, String encode, String recoveryCode) {
    }
}
