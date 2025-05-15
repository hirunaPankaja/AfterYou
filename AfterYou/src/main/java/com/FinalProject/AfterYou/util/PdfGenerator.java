package com.FinalProject.AfterYou.util;


import com.FinalProject.AfterYou.model.LinkedAccount;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.model.Subscription;
import com.itextpdf.text.Document; // ✅ Correct iText import
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.util.List;


public class PdfGenerator {

    public static byte[] generate(PrimaryAccount account, List<LinkedAccount> linkedAccounts, List<Subscription> subscriptions) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);

            document.open();

            document.add(new Paragraph("Primary Account Email: " + account.getEmail()));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Linked Accounts:"));
            for (LinkedAccount la : linkedAccounts) {
                document.add(new Paragraph("- " + la.getPlatform() + " | " + la.getUsername() + " | " + la.getProfileUrl()));
            }

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Subscriptions:"));
            for (Subscription sub : subscriptions) {
                document.add(new Paragraph("- " + sub.getPlatformName() + " | " + sub.getSubscriptionPlan() + " | " + sub.getPlanPrice()));
            }

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }
}
