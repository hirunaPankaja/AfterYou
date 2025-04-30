package com.finalProject.AfterYou.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DigitalAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String platform; // e.g., Facebook, Google
    private String email;

    @Convert(converter = com.finalProject.AfterYou.util.EncryptedStringConverter.class)
    private String password;

    private String twoFactorCode;

    @ManyToOne
    private User owner;
}