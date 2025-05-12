package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.AssignExecutorDTO;
import com.FinalProject.AfterYou.DTO.AssignLawyerRequest;
import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.model.AssignLawyer;
import com.FinalProject.AfterYou.service.AssignExecutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin ("*")
@RestController
@RequestMapping("/api/executors")
public class AssignExecutorController {

    private final AssignExecutorService assignExecutorService;

    @Autowired
    public AssignExecutorController(AssignExecutorService assignExecutorService) {
        this.assignExecutorService = assignExecutorService;
    }

    @PostMapping("/assign")
    public ResponseEntity<AssignExecutor> assignExecutor(
            @RequestBody AssignExecutorDTO assignExecutorDTO) {
        AssignExecutor executor = assignExecutorService.assignExecutor(assignExecutorDTO);
        return ResponseEntity.ok(executor);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AssignExecutor>> getExecutorsByUser(@PathVariable int userId) {
        List<AssignExecutor> executors = assignExecutorService.getExecutorsByUserId(userId);
        return ResponseEntity.ok(executors);
    }

    @GetMapping("/{executorId}")
    public ResponseEntity<AssignExecutor> getExecutorById(@PathVariable int executorId) {
        AssignExecutor executor = assignExecutorService.getExecutorById(executorId);
        return ResponseEntity.ok(executor);
    }

    @PostMapping("/complete-registration/{executorId}")
    public ResponseEntity<AssignExecutor> completeExecutorRegistration(
            @PathVariable int executorId,
            @RequestParam byte[] nicImage,
            @RequestParam String password) {
        AssignExecutor executor = assignExecutorService.updateExecutorRegistration(executorId, nicImage, password);
        return ResponseEntity.ok(executor);
    }
}