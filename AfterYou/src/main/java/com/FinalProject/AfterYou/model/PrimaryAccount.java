package com.FinalProject.AfterYou.model;

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

    @Column(nullable = false)
    private Long userId; // ✅ Store userId directly

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private String recoveryCode;

    // ✅ Add Constructor Matching Service Call
    public PrimaryAccount(Long userId, String email, String password, String recoveryCode) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.recoveryCode = recoveryCode;
    }
}
