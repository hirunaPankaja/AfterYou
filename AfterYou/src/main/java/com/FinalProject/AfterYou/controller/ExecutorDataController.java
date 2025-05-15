// --- ExecutorDataController.java ---
package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.ExecutorDataDTO;
import com.FinalProject.AfterYou.service.ExecutorDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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
    public ResponseEntity<byte[]> downloadExecutorData(@PathVariable int executorId) {
        try {
            String zipPassword = "securePassword"; // Retrieve or generate the password as needed
            byte[] zipBytes = executorDataService.generateExecutorDataZip(executorId, zipPassword);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                    .filename("executor_data.zip")
                    .build());

            return new ResponseEntity<>(zipBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
