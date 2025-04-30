import React, { useRef, useEffect, useState } from "react";
import '../style/LandingPage.css';
import logo from '../assets/logo.png';
import useNavigation from "../hooks/useNavigate";
import SignUpStep1 from "../popups-screens/SignUpStep1";

const LandingPage = () => {
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const { goToLogin, goToPrivacy } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (elementRef) => {
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenSignUp = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseSignUp = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const SignUpModal = () => {
    if (!isModalOpen) return null;
    return (
      <div className="modal-overlay" onClick={handleCloseSignUp}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close" onClick={handleCloseSignUp}>X</button>
          <SignUpStep1 />
        </div>
      </div>
    );
  };

  return (
    <div className="landing-page">
      <header className={`landing-page-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo"><img src={logo} alt="Logo" /></div>
        <nav>
          <a href="#" role="button" tabIndex="0" onClick={() => scrollToSection(aboutRef)}>About Us</a>
          <a href="#" role="button" tabIndex="0" onClick={() => scrollToSection(featuresRef)}>Features</a>
          <a href="#" role="button" tabIndex="0" onClick={() => scrollToSection(howItWorksRef)}>How It Works</a>
        </nav>
        <button className="login-btn" onClick={goToLogin}>Login</button>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1><span className="highlight">After</span> You</h1>
          <p>Ensuring your digital legacy is protected, secure, and managed according to your wishes.</p>
          <button className="signup" onClick={handleOpenSignUp}>Get Started →</button>
        </div>
        <div className="hero-image">📦</div>
      </section>

      <section className="about" ref={aboutRef}>
        <h2>About Our Service</h2>
        <p>In today's digital world, we leave behind countless online accounts, subscriptions, and digital assets. Without proper management, these accounts can be misused, lost, or create unnecessary financial burdens for loved ones. Our service helps you securely plan your digital afterlife by storing credentials, setting account actions, and assigning trusted executors to carry out your final digital wishes.</p>
      </section>

      <section className="features" ref={featuresRef}>
        <h2>Features</h2>
        <p>(What We Do)</p>
        <div className="features-grid">
          <div className="feature-item">🔒 Secure Digital Asset Storage</div>
          <div className="feature-item">💳 Subscription & Payment Cleanup</div>
          <div className="feature-item">👤 Assign a Digital Executor</div>
          <div className="feature-item">📜 Document & Will Storage</div>
          <div className="feature-item">🤖 Automated Account Management</div>
          <div className="feature-item">🔍 Death Verification & Execution</div>
        </div>
      </section>

      <section className="how-it-works" ref={howItWorksRef}>
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Sign Up & Secure Your Data</h3>
              <p>Create an account and securely store your online assets, including social media accounts, cloud storage, financial accounts, and digital documents, using advanced encryption.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Assign a Trusted Executor</h3>
              <p>Select a reliable family member or friend who will be responsible for managing your digital assets in the event of your passing.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Set Your Account Preferences</h3>
              <p>Specify what should happen to each of your accounts, whether they should be permanently deleted, converted into a memorial, or transferred to a designated beneficiary.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Regular Updates</h3>
              <p>Keep your digital legacy up to date by reviewing and confirming your stored information every 1-2 years.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Execution After Death</h3>
              <p>When the time comes, your executor will go through a secure verification process before receiving the necessary access to execute your final digital will.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="#privacy" onClick={goToPrivacy}>Privacy</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#gallery">Gallery</a>
          <a href="#team">Team</a>
        </div>
        <button className="contact-btn">Contact Us</button>
      </footer>

      <SignUpModal />
    </div>
  );
};

export default LandingPage;
