package com.FinalProject.AfterYou.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lawyer_details")
public class AssignLawyer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lawyerId;
    private String lawyerName;
    private String lawyerEmail;
    private String lawyerContact;
    private String lawyerNicNumber;
    private String lawyerIdNumber;

    @Lob
    private byte[] lawyerIdImage;
    private int userId;// Foreign key to user who assigned this lawyer
    private boolean registrationCompleted = false; // To track if lawyer completed registration
}