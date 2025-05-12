package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.repo.AssignExecutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignExecutorService {
    @Autowired
    private AssignExecutorRepository repository;

    public AssignExecutor assignExecutor(AssignExecutor executor, int userId) {
        if (repository.existsByExecutorEmail(executor.getExecutorEmail())) {
            throw new RuntimeException("Executor with this email already exists");
        }
        if (repository.existsByExecutorNicNumber(executor.getExecutorNicNumber())) {
            throw new RuntimeException("Executor with this NIC number already exists");
        }

        executor.setUserId(userId);
        executor.setRegistrationCompleted(false);
        return repository.save(executor);
    }

    public AssignExecutor getExecutorByEmailAndUserId(String email, int userId) {
        return repository.findByExecutorEmailAndUserId(email, userId)
                .orElse(null);
    }

    public AssignExecutor completeExecutorRegistration(int executorId, byte[] nicImage, String password) {
        return repository.findById(executorId)
                .map(executor -> {
                    executor.setExecutorNicImage(nicImage);
                    executor.setExecutorPassword(password);
                    executor.setRegistrationCompleted(true);
                    return repository.save(executor);
                })
                .orElse(null);
    }

    public AssignExecutor getExecutorById(int executorId) {
        return repository.findById(executorId).orElse(null);
    }

    // In AssignExecutorService
    public AssignExecutor saveExecutor(AssignExecutor executor) {
        return repository.save(executor);
    }
}