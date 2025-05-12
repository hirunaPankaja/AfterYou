package com.FinalProject.AfterYou.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignExecutorDTO {
    private String executorName;
    private String executorEmail;
    private String executorNicNumber;
    private String executorRelationship;
    private int userId;
}