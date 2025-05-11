package com.FinalProject.AfterYou.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Table(name = "linked_accounts")
@NoArgsConstructor
@AllArgsConstructor
public class LinkedAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long linkedId;

    @ManyToOne
    @JoinColumn(name = "primary_id", nullable = false)
    @JsonBackReference
    private PrimaryAccount primaryAccount;

    @Column(nullable = false)
    private String platform;

    @Column(nullable = true)
    private String username;

    @Column(nullable = true)
    private String profileUrl;

    @Column(nullable = true)
    private String actionType;

    // ✅ Add Constructor Matching Service Call
    public LinkedAccount(PrimaryAccount primaryAccount, String platform, String username, String profileUrl, String actionType) {
        this.primaryAccount = primaryAccount;
        this.platform = platform;
        this.username = username;
        this.profileUrl = profileUrl;
        this.actionType = actionType;
    }
}
