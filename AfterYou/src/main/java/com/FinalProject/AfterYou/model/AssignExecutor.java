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
    @Column(name = "executor_nic_image", columnDefinition = "LONGBLOB")
    private byte[] executorNicImage;
    private String executorPassword;
    private int userId;
    private boolean registrationCompleted = false;
}