package com.FinalProject.AfterYou.model;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@ToString
@Entity
@Table(name = "linked_accounts") // ✅ Ensure correct table mapping
@NoArgsConstructor
@AllArgsConstructor
public class LinkedAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "linked_id") // ✅ Fix column name to match database
    private Long linkedId;

    @ManyToOne
    @JoinColumn(name = "primary_id", nullable = false) // ✅ Ensure correct column mapping
    private PrimaryAccount primaryAccount;

    @Column(nullable = false)
    private String platform;

    @Column(nullable = true)
    private String username;

    @Column(nullable = true)
    private String profileUrl;

    @Column(nullable = true)
    private String actionType;

    @Column(nullable = false)
    private boolean isDeleted = false; // ✅ Soft delete flag

    // ✅ Getter for Primary ID (Handles null safely)
    public Long getPrimaryId() {
        return (primaryAccount != null) ? primaryAccount.getPrimaryId() : null;
    }

    // ✅ Constructor Matching Service Call (Ensures `isDeleted = false`)
    public LinkedAccount(PrimaryAccount primaryAccount, String platform, String username, String profileUrl, String actionType) {
        this.primaryAccount = primaryAccount;
        this.platform = platform;
        this.username = username;
        this.profileUrl = profileUrl;
        this.actionType = actionType;
        this.isDeleted = false; // ✅ Ensure default value
    }
}
