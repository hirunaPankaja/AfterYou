package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.DTO.AssignExecutorDTO;
import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.repo.AssignExecutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignExecutorService {

    private final AssignExecutorRepository assignExecutorRepository;

    @Autowired
    public AssignExecutorService(AssignExecutorRepository assignExecutorRepository) {
        this.assignExecutorRepository = assignExecutorRepository;
    }

    public AssignExecutor assignExecutor(AssignExecutorDTO assignExecutorDTO) {
        // Check if executor with same email or NIC already exists
        if (assignExecutorRepository.existsByExecutorEmail(assignExecutorDTO.getExecutorEmail())) {
            throw new RuntimeException("Executor with this email already exists");
        }

        if (assignExecutorRepository.existsByExecutorNicNumber(assignExecutorDTO.getExecutorNicNumber())) {
            throw new RuntimeException("Executor with this NIC number already exists");
        }

        AssignExecutor executor = new AssignExecutor();
        executor.setExecutorName(assignExecutorDTO.getExecutorName());
        executor.setExecutorEmail(assignExecutorDTO.getExecutorEmail());
        executor.setExecutorNicNumber(assignExecutorDTO.getExecutorNicNumber());
        executor.setExecutorRelationship(assignExecutorDTO.getExecutorRelationship());
        executor.setUserId(assignExecutorDTO.getUserId());
        executor.setRegistrationCompleted(false); // Registration not completed yet

        return assignExecutorRepository.save(executor);
    }

    public List<AssignExecutor> getExecutorsByUserId(int userId) {
        return assignExecutorRepository.findByUserId(userId);
    }

    public AssignExecutor getExecutorById(int executorId) {
        return assignExecutorRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Executor not found"));
    }

    public AssignExecutor updateExecutorRegistration(int executorId, byte[] nicImage, String password) {
        AssignExecutor executor = getExecutorById(executorId);
        executor.setExecutorNicImage(nicImage);
        executor.setExecutorPassword(password);
        executor.setRegistrationCompleted(true);
        return assignExecutorRepository.save(executor);
    }
}