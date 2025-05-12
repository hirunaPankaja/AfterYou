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
@Table(name = "executor_details")
public class AssignExecutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int executorId;
    private String executorName;
    private String executorEmail;
    private String executorNicNumber;
    private String executorRelationship;

    @Lob
    private byte[] executorNicImage;
    private String executorPassword;
    private int userId;// Foreign key to user who assigned this lawyer
    private boolean registrationCompleted = false; // To track if lawyer completed registration
}