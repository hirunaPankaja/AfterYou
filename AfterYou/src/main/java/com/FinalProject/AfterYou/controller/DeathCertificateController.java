package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.model.DeathCertificate;
import com.FinalProject.AfterYou.service.DeathCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@RestController
@RequestMapping("/api/death-certificates")
@CrossOrigin
public class DeathCertificateController {

    @Autowired
    private DeathCertificateService deathCertificateService;

    @PostMapping("/upload")
    public ResponseEntity<DeathCertificate> uploadCertificate(
            @RequestParam String deceasedName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date deceasedDate,
            @RequestParam MultipartFile deathCertificate,
            @RequestParam int executorId
    ) {
        try {
            byte[] certificateBytes = deathCertificate.getBytes();
            DeathCertificate saved = deathCertificateService.uploadCertificate(deceasedName, deceasedDate, certificateBytes, executorId);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/verify/{certId}")
    public ResponseEntity<String> verifyCertificate(@PathVariable int certId) {
        boolean updated = deathCertificateService.verifyCertificate(certId);

        if (updated) {
            return ResponseEntity.ok("Certificate Verified Successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in Verifying Certificate");
        }
    }
    @GetMapping("/verified/{executorId}")
    public ResponseEntity<String> isCertificateVerified(@PathVariable int executorId) {
        boolean verified = deathCertificateService.isCertificateVerified(executorId);
        return ResponseEntity.ok(verified ? "yes" : "no");
    }


}
