# 🧾 Digital Death Cleanup Web Application – Final Year Project

> **Securely manage your digital legacy and automate digital asset handling after death.**

---

## 📘 Project Overview

This web application helps users plan their **digital afterlife** by:

- Adding and managing digital accounts and subscriptions.
- Assigning a **trusted executor** and optional legal verifier.
- Specifying what should happen to their accounts (e.g., delete, transfer).
- Storing recovery codes to bypass 2FA restrictions posthumously.
- Automating the execution process through secure verification and legal proof of death.

---

## 🌟 Key Features

- 🔐 **User & Executor Authentication** (Spring Security with JWT)
- 📁 **Add and Manage Accounts** (e.g., Facebook, YouTube, crypto wallets)
- 🧾 **Track Subscriptions** and specify actions (cancel, ignore)
- 🧑‍⚖️ **Assign Executors & Lawyers** by email
- 📧 **Email-Based Executor Invitation**
- 📄 **Executor Uploads Death Certificate**
- ✅ **Execution Verification Flow** via assigned verifier
- 🔄 **Automated Actions**: transfer credentials, cancel subscriptions, delete accounts
- 🔐 **Encrypted Credential Storage** using strong algorithms
- 🛡️ **Secure Recovery Code Handling** for 2FA accounts

---

## 🧑‍💻 Tech Stack

### 👨‍🏫 Frontend
- **React JS**
- **Plain CSS**
- **EmailJS** (for sending email invitations)

### 🔧 Backend
- **Spring Boot**
- **Spring Security + JWT** for authentication
- **JPA/Hibernate** for database operations

### 🗄️ Database
- **MySQL** (hosted via AWS RDS Free Tier)

### ☁️ Cloud & File Storage
- **AWS S3 (Free Tier)** – to store death certificates and uploaded documents

---

## 🔐 Security & Privacy

- AES-encrypted credentials stored securely
- JWT-based authentication with role access (User, Executor, Verifier)
- All sensitive documents (e.g., recovery codes, certificates) securely stored on AWS
- Executor cannot access data until:
  - Proof of death is uploaded
  - Verified by assigned legal verifier
- All actions logged for traceability

---

## ⚙️ How It Works

1. **User Onboarding**  
   - Registers and adds accounts/subscriptions  
   - Assigns executor and legal verifier  
   - Stores recovery codes for accounts with 2FA  

2. **Executor Onboarding**  
   - Receives email link  
   - Signs up and gets verified  
   - Uploads death certificate  

3. **Verification & Execution**  
   - Legal verifier confirms certificate  
   - Executor receives access  
   - System auto-performs actions (deletion/transfer)  
   - Credentials and recovery codes are shown securely  

---

## 📦 Deployment (Free Tier Friendly)

- **Frontend**: GitHub Pages or AWS Amplify  
- **Backend**: AWS EC2 (Free Tier)  
- **Database**: AWS RDS MySQL  
- **File Storage**: AWS S3 (Free Tier)  
- **Email**: EmailJS or AWS SES

---

## 📈 Future Scope

- Government API integration for automated death verification  
- Browser automation for account deletion (Facebook, Gmail, etc.)  
- Mobile app for executors  
- AI-based document verification

---

## 📌 Why This Project?

Managing a loved one’s digital legacy is emotionally and technically challenging. This app:

- Eases the digital burden on families  
- Provides a secure and legal path for account closure  
- Protects user privacy even after death  
- Offers peace of mind to users planning ahead  

---

