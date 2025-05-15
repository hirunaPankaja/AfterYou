package com.FinalProject.AfterYou.util;

import com.FinalProject.AfterYou.model.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class PdfGenerator {

    // Color scheme
    private static final BaseColor PRIMARY_COLOR = new BaseColor(0, 102, 204); // Blue
    private static final BaseColor SECONDARY_COLOR = new BaseColor(241, 241, 241); // Light gray
    private static final BaseColor ACCENT_COLOR = new BaseColor(255, 153, 0); // Orange

    // Fonts
    private static final Font TITLE_FONT = new Font(Font.FontFamily.HELVETICA, 22, Font.BOLD, PRIMARY_COLOR);
    private static final Font SECTION_FONT = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD, PRIMARY_COLOR);
    private static final Font HEADER_FONT = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
    private static final Font LABEL_FONT = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD);
    private static final Font VALUE_FONT = new Font(Font.FontFamily.HELVETICA, 10);
    private static final Font URL_FONT = new Font(Font.FontFamily.HELVETICA, 10, Font.UNDERLINE, BaseColor.BLUE);
    private static final Font PASSWORD_FONT = new Font(Font.FontFamily.COURIER, 12, Font.BOLD, BaseColor.RED);

    public static byte[] generate(PrimaryAccount primary,
                                  List<LinkedAccount> linkedAccounts,
                                  List<Subscription> subscriptions) throws DocumentException {

        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, baos);
        document.open();

        // Add document metadata
        document.addTitle("Account Information Report");
        document.addAuthor("AfterYou Digital Executor");

        // Add header
        addHeader(document);

        // Add primary account info
        addPrimaryAccountInfo(document, primary);

        // Add linked accounts
        addLinkedAccounts(document, linkedAccounts);

        // Add subscriptions
        addSubscriptions(document, subscriptions);

        // Add footer
        addFooter(writer, document);

        document.close();
        return baos.toByteArray();
    }

    private static void addHeader(Document doc) throws DocumentException {
        Paragraph header = new Paragraph("ACCOUNT INFORMATION REPORT", TITLE_FONT);
        header.setAlignment(Element.ALIGN_CENTER);
        header.setSpacingAfter(20);
        doc.add(header);

        // Add decorative line
        LineSeparator line = new LineSeparator();
        line.setLineColor(PRIMARY_COLOR);
        doc.add(new Chunk(line));
        doc.add(Chunk.NEWLINE);
    }

    private static void addPrimaryAccountInfo(Document doc, PrimaryAccount primary) throws DocumentException {
        Paragraph sectionTitle = new Paragraph("PRIMARY ACCOUNT", SECTION_FONT);
        sectionTitle.setSpacingAfter(10);
        doc.add(sectionTitle);

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(90);
        table.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.setSpacingBefore(10);
        table.setSpacingAfter(20);

        // Set table styling
        table.getDefaultCell().setBorderColor(SECONDARY_COLOR);
        table.getDefaultCell().setPadding(8);

        // Add account details
        addTableRow(table, "Email:", primary.getEmail());
        addTableRow(table, "Recovery Code:",
                primary.getRecoveryCode() != null ? primary.getRecoveryCode() : "Not set");
        String decryptedPassword ; // default for safety
        try {
            decryptedPassword = AESEncryptionUtil.decrypt(primary.getPassword());
        } catch (Exception e) {
            decryptedPassword = "[Unable to decrypt]";
        }
        addTableRow(table, "Password:", decryptedPassword);

        doc.add(table);

        // Add decorative separator
        doc.add(Chunk.NEWLINE);
        LineSeparator separator = new LineSeparator();
        separator.setLineColor(SECONDARY_COLOR);
        doc.add(new Chunk(separator));
        doc.add(Chunk.NEWLINE);
    }

    private static void addLinkedAccounts(Document doc, List<LinkedAccount> accounts) throws DocumentException {
        if (accounts.isEmpty()) return;

        Paragraph sectionTitle = new Paragraph("LINKED ACCOUNTS", SECTION_FONT);
        sectionTitle.setSpacingAfter(10);
        doc.add(sectionTitle);

        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10);
        table.setSpacingAfter(20);

        // Table header
        PdfPCell header1 = new PdfPCell(new Phrase("Platform", HEADER_FONT));
        PdfPCell header2 = new PdfPCell(new Phrase("Username", HEADER_FONT));
        PdfPCell header3 = new PdfPCell(new Phrase("Profile URL", HEADER_FONT));

        for (PdfPCell header : new PdfPCell[]{header1, header2, header3}) {
            header.setBackgroundColor(PRIMARY_COLOR);
            header.setPadding(8);
            table.addCell(header);
        }

        // Table content
        for (LinkedAccount acc : accounts) {
            table.addCell(createContentCell(acc.getPlatform()));
            table.addCell(createContentCell(acc.getUsername()));

            if (acc.getProfileUrl() != null) {
                Phrase urlPhrase = new Phrase(acc.getProfileUrl(), URL_FONT);
                table.addCell(createContentCell(urlPhrase));
            } else {
                table.addCell(createContentCell("N/A"));
            }
        }

        doc.add(table);
        doc.add(Chunk.NEWLINE);
    }

    private static void addSubscriptions(Document doc, List<Subscription> subscriptions) throws DocumentException {
        if (subscriptions.isEmpty()) return;

        Paragraph sectionTitle = new Paragraph("SUBSCRIPTIONS", SECTION_FONT);
        sectionTitle.setSpacingAfter(10);
        doc.add(sectionTitle);

        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10);

        // Table header
        String[] headers = {"Platform", "Plan", "Price", "Start Date", "End Date"};
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, HEADER_FONT));
            cell.setBackgroundColor(PRIMARY_COLOR);
            cell.setPadding(8);
            table.addCell(cell);
        }

        // Table content
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        for (Subscription sub : subscriptions) {
            table.addCell(createContentCell(sub.getPlatformName()));
            table.addCell(createContentCell(sub.getSubscriptionPlan()));
            table.addCell(createContentCell(sub.getPlanPrice()));
            table.addCell(createContentCell(sub.getSubscriptionStartDate().format(dateFormat)));

            PdfPCell endDateCell = createContentCell(sub.getSubscriptionEndDate().format(dateFormat));
            if (sub.getSubscriptionEndDate().isBefore(java.time.LocalDate.now())) {
                endDateCell.setBackgroundColor(new BaseColor(255, 230, 230)); // Light red for expired
            }
            table.addCell(endDateCell);
        }

        doc.add(table);
    }

    private static void addFooter(PdfWriter writer, Document doc) throws DocumentException {
        PdfPTable footer = new PdfPTable(1);
        footer.setWidthPercentage(100);
        footer.setTotalWidth(500);

        Paragraph footerText = new Paragraph(
                "Generated on " + java.time.LocalDate.now() +
                        "\nConfidential - For authorized use only",
                new Font(Font.FontFamily.HELVETICA, 8, Font.ITALIC, BaseColor.GRAY)
        );
        footerText.setAlignment(Element.ALIGN_CENTER);

        PdfPCell cell = new PdfPCell(footerText);
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setPaddingTop(20);
        footer.addCell(cell);

        footer.writeSelectedRows(0, -1, 0, 30, writer.getDirectContent());
    }

    // Helper methods
    private static void addTableRow(PdfPTable table, String label, String value) {
        table.addCell(new Phrase(label, LABEL_FONT));
        table.addCell(new Phrase(value, VALUE_FONT));
    }

    private static PdfPCell createContentCell(String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, VALUE_FONT));
        cell.setPadding(6);
        cell.setBorderColor(SECONDARY_COLOR);
        return cell;
    }

    private static PdfPCell createContentCell(Phrase phrase) {
        PdfPCell cell = new PdfPCell(phrase);
        cell.setPadding(6);
        cell.setBorderColor(SECONDARY_COLOR);
        return cell;
    }
}