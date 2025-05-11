package com.FinalProject.AfterYou.model;


import jakarta.persistence.*;

@Entity
public class UserAccount {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email; // Primary Gmail or Linked Account Email

    @Column(nullable = false)
    private String accountType; // "PRIMARY" or "LINKED"

    @Column(nullable = true)
    private String platform; // e.g., Facebook, Twitter (only for linked accounts)

    @Column(nullable = true)
    private String username; // Username for linked accounts

    @Column(nullable = true)
    private String profileUrl; // Profile URL for linked accounts

    @Column(nullable = true)
    private String actionType; // "DELETE" or "TRANSFER" (only for linked accounts)


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }


}
