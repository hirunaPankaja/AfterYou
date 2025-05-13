package com.FinalProject.AfterYou.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ExecutorLoginResponseDto {
    private String email;
    private int executorId;

    public ExecutorLoginResponseDto(String email, int executorId) {
        this.email = email;
        this.executorId = executorId;
    }

    // Getters
    public String getEmail() {
        return email;
    }

    public int getExecutorId() {
        return executorId;
    }
}
