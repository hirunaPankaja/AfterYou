package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.AssignExecutorDTO;
import com.FinalProject.AfterYou.DTO.ExecutorLoginRequestDto;
import com.FinalProject.AfterYou.DTO.ExecutorLoginResponseDto;
import com.FinalProject.AfterYou.DTO.UserProfileDto;
import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.service.AssignExecutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/executors")
public class AssignExecutorController {
    @Autowired
    private AssignExecutorService service;

    @PostMapping("/assign")
    public ResponseEntity<AssignExecutor> assignExecutor(
            @RequestBody AssignExecutorDTO request,
            @RequestParam int userId) {
        AssignExecutor executor = new AssignExecutor();
        executor.setExecutorName(request.getExecutorName());
        executor.setExecutorEmail(request.getExecutorEmail());
        executor.setExecutorNicNumber(request.getExecutorNicNumber());
        executor.setExecutorRelationship(request.getExecutorRelationship());

        AssignExecutor savedExecutor = service.assignExecutor(executor, userId);
        return ResponseEntity.ok(savedExecutor);
    }

    @GetMapping("/by-email-and-user")
    public ResponseEntity<AssignExecutor> getExecutorByEmailAndUserId(
            @RequestParam String email,
            @RequestParam int userId) {
        AssignExecutor executor = service.getExecutorByEmailAndUserId(email, userId);
        return executor != null ?
                ResponseEntity.ok(executor) :
                ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/complete-registration/{executorEmail}/{userId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AssignExecutor> completeExecutorRegistration(
            @PathVariable String executorEmail,
            @PathVariable int userId,
            @RequestParam("nicImage") MultipartFile nicImage,
            @RequestParam String password) throws IOException {

        // 1. Find executor by email and userId
        AssignExecutor executor = service.getExecutorByEmailAndUserId(
                executorEmail, userId);

        if (executor == null) {
            return ResponseEntity.notFound().build();
        }

        // 2. Update with the found executor
        executor.setExecutorNicImage(nicImage.getBytes());
        executor.setExecutorPassword(password);
        executor.setRegistrationCompleted(true);

        // 3. Save and return
        AssignExecutor updatedExecutor = service.saveExecutor(executor);
        return ResponseEntity.ok(updatedExecutor);
    }

    @GetMapping("/{executorId}")
    public ResponseEntity<AssignExecutor> getExecutorById(@PathVariable int executorId) {
        AssignExecutor executor = service.getExecutorById(executorId);
        return executor != null ? ResponseEntity.ok(executor) : ResponseEntity.notFound().build();
    }

    @GetMapping("/profile/by-email")
    public ResponseEntity<UserProfileDto> getUserProfileByEmail(@RequestParam String email) {
        UserProfileDto profileDto = service.getUserProfileByEmail(email);
        return ResponseEntity.ok(profileDto);
    }

    @PostMapping("/executor/login")
    public ExecutorLoginResponseDto loginExecutor(@RequestBody ExecutorLoginRequestDto request) {
        return service.executorLogin(request.getEmail(), request.getPassword());
    }
}