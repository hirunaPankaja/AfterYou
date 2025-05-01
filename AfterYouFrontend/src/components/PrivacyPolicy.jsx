import React from 'react'; // Importing React library
import '../style/PrivacyPolicy.css';  // Importing CSS styles for the Privacy Policy component
import logo from '../assets/logo.png';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-layout">
      <div className="background-overlay">
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="company-name">
            <span className="after">After</span><span className="you">You</span>
          </h1>
        </div>
        
        <div className="privacy-content">
          <h2>Privacy Policy & Terms Overlay</h2>
          
          <h3>Your Privacy Matters to Us</h3>
          <p>At After You, we understand that your privacy and the security of your personal data are of the utmost importance. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our Digital Death Cleanup Service.</p>
          <p>By using our web app, you acknowledge that you have read, understood, and agreed to this Privacy Policy. If you do not agree with this policy, please do not use our services.</p>

          <section>
            <h3>1. Information We Collect</h3>
            <p>We collect the following types of information to provide our services effectively:</p>
            <ul>
              <li>Account Information: Your email, password, and any other credentials necessary for securing and accessing your digital accounts (e.g., Facebook, YouTube, Crypto Wallet).</li>
              <li>Personal Information: Name, contact information, and your digital asset preferences.</li>
              <li>Digital Asset Inventory: The list of digital accounts you add (social media, cloud storage, subscription services, etc.).</li>
              <li>2FA Recovery Codes: If you choose to enable 2FA for account security, we may collect and store your recovery codes securely for future use by your designated executor.</li>
              <li>Executor Information: Email addresses of family members or trusted persons assigned as executors to manage your digital assets upon your death.</li>
              <li>Activity Data: Information on your use of the service, such as adding or modifying accounts, updating executor information, etc.</li>
            </ul>
          </section>

          <section>
            <h3>2. How We Use Your Information</h3>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>To Provide Our Services: We use your data to securely store and manage your digital asset inventory, assist in executing your last will, and facilitate the transfer, deletion, or memorialization of your digital accounts.</li>
              <li>To Verify Identity: We use your personal and executor information to verify identities and authenticate death verification processes.</li>
              <li>To Communicate with You: We may send you notifications about your account, service updates, and any changes to this Privacy Policy.</li>
              <li>For Legal Compliance: We may need to use your data to comply with applicable laws or to handle legal matters related to digital asset management.</li>
            </ul>
          </section>

          <section>
            <h3>3. How We Protect Your Data</h3>
            <p>We take the protection of your data very seriously. The following measures are implemented to keep your information secure:</p>
            <ul>
              <li>Data Encryption: All sensitive data, including passwords and 2FA recovery codes, are stored using strong encryption methods.</li>
              <li>Secure Access Control: We employ strict access controls to ensure that only authorized personnel can access your data.</li>
              <li>Regular Audits: We conduct regular security audits to ensure compliance with industry best practices.</li>
            </ul>
          </section>

          <section>
            <h3>4. Sharing Your Information</h3>
            <p>We do not sell, rent, or share your personal data with third parties for marketing purposes. However, we may share your data under the following circumstances:</p>
            <ul>
              <li>With Your Executor: When the death verification process is complete, we may grant your designated executor access to your account data to execute your last will.</li>
              <li>Legal Requirements: We may disclose your information to comply with legal obligations, such as court orders or other legal processes.</li>
              <li>Third-Party Service Providers: We may share your data with trusted partners who provide services that help us manage and deliver our services. These partners are required to protect your data in accordance with our privacy standards.</li>
            </ul>
          </section>

          <section>
            <h3>5. Your Rights and Choices</h3>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li>Access and Correction: You can request access to your personal information and ask for corrections if the data is inaccurate.</li>
              <li>Data Deletion: You can request that we delete your personal data from our systems.</li>
              <li>Account Updates: You are required to update your account details every 1–2 years to ensure your digital inventory is up to date.</li>
              <li>Opt-Out: You can choose not to receive marketing communications from us by opting out in the settings of your account.</li>
            </ul>
          </section>

          <section>
            <h3>6. Cookies and Tracking Technologies</h3>
            <p>We use cookies and other tracking technologies to enhance your user experience, analyze trends, and manage the functionality of the web app. You can control cookies through your browser settings. By continuing to use our website, you consent to our use of cookies.</p>
          </section>

          <section>
            <h3>7. Data Retention</h3>
            <p>We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. When your data is no longer needed, we will securely delete or anonymize it.</p>
          </section>

          <section>
            <h3>8. Changes to This Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by sending a notice to your email address or displaying a prominent notice within the web app. Please review the Privacy Policy regularly to stay informed of any changes.</p>
          </section>

          <section className="contact-section">
            <h3>9. Contact Us</h3>
            <p>If you have any questions or concerns about our privacy practices, please contact us at:</p>
            <p>Email: [Your Support Email]</p>
            <p>Address: [Your Company Address]</p>
            <p>Phone: [Your Support Phone Number]</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
