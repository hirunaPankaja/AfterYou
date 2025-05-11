package com.FinalProject.AfterYou.model;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true) // Ensure unique emails
    private String email; // Primary Gmail or Linked Account Email

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountType accountType; // "PRIMARY" or "LINKED"

    @Column(nullable = false)
    private String password; // Hashed password for security

    @Column(nullable = true)
    private String recoveryCode; // Recovery code for account recovery

    @Column(nullable = true)
    private String platform; // e.g., Facebook, Twitter (only for linked accounts)

    @Column(nullable = true)
    private String username; // Username for linked accounts

    @Column(nullable = true)
    private String profileUrl; // Profile URL for linked accounts

    @Column(nullable = true)
    private String actionType; // "DELETE" or "TRANSFER" (only for linked accounts)

    // ✅ Default Constructor
    public UserAccount() {}

    // ✅ Parameterized Constructor
    public UserAccount(String email, AccountType accountType, String password, String recoveryCode, String platform, String username, String profileUrl, String actionType) {
        this.email = email;
        this.accountType = accountType;
        this.password = new BCryptPasswordEncoder().encode(password); // Hash password before storing
        this.recoveryCode = recoveryCode;
        this.platform = platform;
        this.username = username;
        this.profileUrl = profileUrl;
        this.actionType = actionType;
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public AccountType getAccountType() { return accountType; }
    public void setAccountType(AccountType accountType) { this.accountType = accountType; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = new BCryptPasswordEncoder().encode(password); } // Hash password

    public String getRecoveryCode() { return recoveryCode; }
    public void setRecoveryCode(String recoveryCode) { this.recoveryCode = recoveryCode; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getProfileUrl() { return profileUrl; }
    public void setProfileUrl(String profileUrl) { this.profileUrl = profileUrl; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }
}
