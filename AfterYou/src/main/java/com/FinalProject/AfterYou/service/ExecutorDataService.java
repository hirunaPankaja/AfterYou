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
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
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

    public byte[] generateExecutorDataZip(int executorId, String zipPassword) throws IOException {
        // Retrieve userId from AssignExecutor
        int userId = assignExecutorRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Executor not found"))
                .getUserId();

        // Retrieve PrimaryAccount
        PrimaryAccount primaryAccount = primaryAccountRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("PrimaryAccount not found"));

        // Retrieve LinkedAccounts and Subscriptions
        List<LinkedAccount> linkedAccounts = linkedAccountRepository.findByPrimaryAccountAndIsDeletedFalse(primaryAccount);
        List<Subscription> subscriptions = subscriptionRepository.findByPrimaryAccount(primaryAccount);

        // Generate PDF
        byte[] pdfBytes = PdfGenerator.generate(primaryAccount, linkedAccounts, subscriptions);

        // Zip the PDF with password
        return ZipUtil.createPasswordProtectedZip(pdfBytes, zipPassword);
    }

    public void sendExecutorDataEmail(int executorId, String zipPassword) throws IOException {
        AssignExecutor executor = assignExecutorRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Executor assignment not found"));

        int userId = executor.getUserId();
        PrimaryAccount primaryAccount = primaryAccountRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Primary account not found"));

        String executorEmail = executor.getExecutorEmail(); // Ensure this method or field exists
        if (executorEmail == null || executorEmail.isEmpty()) {
            throw new RuntimeException("Executor email is not available");
        }

        byte[] zipBytes = generateExecutorDataZip(executorId, zipPassword);

        String subject = "Your Assigned Digital Executor Package";
        String htmlBody = "<p>Dear Executor,</p>" +
                "<p>Attached is the digital data package (ZIP file) for your assigned user. The ZIP file is password-protected.</p>" +
                "<p><strong>Password:</strong> " + zipPassword + "</p>" +
                "<p>Keep it secure.</p>";

        emailService.sendEmailWithAttachment(executorEmail, subject, htmlBody, zipBytes, "executor_data.zip");
    }
}
