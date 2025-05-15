package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.DTO.ExecutorDataDTO;
import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.model.LinkedAccount;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.model.Subscription;
import com.FinalProject.AfterYou.repo.AssignExecutorRepository;
import com.FinalProject.AfterYou.repo.LinkedAccountRepository;
import com.FinalProject.AfterYou.repo.PrimaryAccountRepository;
import com.FinalProject.AfterYou.repo.SubscriptionRepository;
import com.FinalProject.AfterYou.util.PdfGenerator;
import com.FinalProject.AfterYou.util.ZipUtil;
import com.itextpdf.text.DocumentException;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExecutorDataService {

    private final AssignExecutorRepository assignExecutorRepository;
    private final PrimaryAccountRepository primaryAccountRepository;
    private final LinkedAccountRepository linkedAccountRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final EmailService emailService;

    @Autowired
    public ExecutorDataService(AssignExecutorRepository assignExecutorRepository,
                               PrimaryAccountRepository primaryAccountRepository,
                               LinkedAccountRepository linkedAccountRepository,
                               SubscriptionRepository subscriptionRepository,
                               EmailService emailService) {
        this.assignExecutorRepository = assignExecutorRepository;
        this.primaryAccountRepository = primaryAccountRepository;
        this.linkedAccountRepository = linkedAccountRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.emailService = emailService;
    }

    @Transactional
    public ExecutorDataDTO getExecutorData(int executorId) {
        AssignExecutor assignment = assignExecutorRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Executor not assigned to any user"));

        int userId = assignment.getUserId();
        PrimaryAccount primaryAccount = primaryAccountRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Primary account not found for userId: " + userId));

        List<LinkedAccount> linkedAccounts = linkedAccountRepository.findByPrimaryAccountAndIsDeletedFalse(primaryAccount);
        List<Subscription> subscriptions = subscriptionRepository.findByPrimaryAccount_PrimaryId(primaryAccount.getPrimaryId());

        List<ExecutorDataDTO.LinkedAccountDTO> linkedAccountDTOS = linkedAccounts.stream()
                .map(a -> new ExecutorDataDTO.LinkedAccountDTO(a.getPlatform(), a.getProfileUrl(), a.getUsername()))
                .collect(Collectors.toList());

        List<com.FinalProject.AfterYou.DTO.SubscriptionDTO> subscriptionDTOS = subscriptions.stream()
                .map(s -> new com.FinalProject.AfterYou.DTO.SubscriptionDTO(
                        s.getSubscriptionId(),
                        s.getPlatformName(),
                        s.getSubscriptionPlan(),
                        s.getPlanPrice(),
                        s.getSubscriptionStartDate(),
                        s.getSubscriptionEndDate()
                ))
                .collect(Collectors.toList());

        ExecutorDataDTO result = new ExecutorDataDTO();
        result.setEmail(primaryAccount.getEmail());
        result.setLinkedAccounts(linkedAccountDTOS);
        result.setSubscriptions(subscriptionDTOS);

        return result;
    }

    public void sendPasswordToExecutor(int executorId, String password) {
        AssignExecutor executor = assignExecutorRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Executor not found"));

        try {
            emailService.sendPasswordEmail(executor.getExecutorEmail(), password);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send password email", e);
        }
    }

    public byte[] generateExecutorDataZip(int executorId, String zipPassword) throws IOException, DocumentException {
        // Retrieve data
        int userId = assignExecutorRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Executor not found"))
                .getUserId();

        PrimaryAccount primary = primaryAccountRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Primary account not found"));

        List<LinkedAccount> linkedAccounts = linkedAccountRepository.findByPrimaryAccountAndIsDeletedFalse(primary);
        List<Subscription> subscriptions = subscriptionRepository.findByPrimaryAccount(primary);

        // Generate enhanced PDF
        byte[] pdfBytes = PdfGenerator.generate(
                primary,
                linkedAccounts,
                subscriptions// Include decrypt password in PDF
        );

        // Create password-protected ZIP
        return ZipUtil.createPasswordProtectedZip(pdfBytes, zipPassword);
    }
    public void handleExecutorDataDownload(int executorId, HttpServletResponse response) throws IOException, DocumentException {
        // Generate a secure random password
        String zipPassword = generateSecurePassword();

        // Send password to executor's email
        sendPasswordToExecutor(executorId, zipPassword);

        // Generate the ZIP file
        byte[] zipBytes = generateExecutorDataZip(executorId, zipPassword);

        // Set response headers
        response.setContentType("application/zip");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"executor_data.zip\"");
        response.setContentLength(zipBytes.length);

        // Write ZIP file to response
        response.getOutputStream().write(zipBytes);
        response.getOutputStream().flush();
    }

    public String generateSecurePassword() {
        // Your existing password generation logic
        String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lower = "abcdefghijklmnopqrstuvwxyz";
        String digits = "0123456789";
        String special = "!@#$%^&*";
        String all = upper + lower + digits + special;

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        password.append(upper.charAt(random.nextInt(upper.length())));
        password.append(lower.charAt(random.nextInt(lower.length())));
        password.append(digits.charAt(random.nextInt(digits.length())));
        password.append(special.charAt(random.nextInt(special.length())));

        for (int i = 4; i < 12; i++) {
            password.append(all.charAt(random.nextInt(all.length())));
        }

        return shuffleString(password.toString());
    }

    private String shuffleString(String input) {
        char[] characters = input.toCharArray();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < characters.length; i++) {
            int randomIndex = random.nextInt(characters.length);
            char temp = characters[i];
            characters[i] = characters[randomIndex];
            characters[randomIndex] = temp;
        }
        return new String(characters);
    }
}