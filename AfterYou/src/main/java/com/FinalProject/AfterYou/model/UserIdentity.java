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
@Table(name = "user_identity")
public class UserIdentity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String identityType;
    private String identityNumber;

    // Corrected BLOB field types
    @Lob
    private byte[] identityImage;

    @Lob
    private byte[] selfie;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private UserRegistrationDetails user;

}
