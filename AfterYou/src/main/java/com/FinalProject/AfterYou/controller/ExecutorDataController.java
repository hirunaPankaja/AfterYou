// --- ExecutorDataController.java ---
package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.ExecutorDataDTO;
import com.FinalProject.AfterYou.service.ExecutorDataService;
import com.itextpdf.text.DocumentException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/executor/data")
public class ExecutorDataController {

    private final ExecutorDataService executorDataService;

    @Autowired
    public ExecutorDataController(ExecutorDataService executorDataService) {
        this.executorDataService = executorDataService;
    }

    // GET /api/executor/data/{executorId}
    @GetMapping("/data/{executorId}")
    public ExecutorDataDTO getExecutorData(@PathVariable int executorId) {
        return executorDataService.getExecutorData(executorId);
    }

    @GetMapping("/download/{executorId}")
    public ResponseEntity<byte[]> downloadExecutorData(@PathVariable int executorId) throws IOException, DocumentException {
        // Delegate password generation to service
        String zipPassword = executorDataService.generateSecurePassword();
        executorDataService.sendPasswordToExecutor(executorId, zipPassword);
        byte[] zipBytes = executorDataService.generateExecutorDataZip(executorId, zipPassword);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"executor_data.zip\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(zipBytes);
    }
}
