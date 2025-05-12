package com.FinalProject.AfterYou.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String verificationLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("keelsprojectmanagement@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject("AfterYou Email Verification");

        String html = "<div style='font-family:sans-serif;padding:20px'>" +
                "<h2>Welcome to AfterYou</h2>" +
                "<p>Please click the button below to verify your email address:</p>" +
                "<a href='" + verificationLink + "' " +
                "style='padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px'>Verify Email</a>" +
                "<p>If you didn’t sign up, you can ignore this email.</p></div>";

        helper.setText(html, true);

        System.out.println("Sending email to: " + toEmail); // Debug log
        mailSender.send(message);
        System.out.println("Email sent successfully");
    }
}
