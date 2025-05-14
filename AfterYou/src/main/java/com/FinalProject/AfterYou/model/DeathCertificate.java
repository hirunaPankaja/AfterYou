package com.FinalProject.AfterYou.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name="death_certificate_verification")
public class DeathCertificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int certId;
    private String deceasedName;
    private Date deceasedDate;
    private byte[] deathCertificate;
    private int userId; // user id for get details of user

    @Column(name = "is_verified")
    private boolean isVerified;

    private int executorId; // executor id for find executor and send user data
}
