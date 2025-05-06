import React, { useRef, useEffect, useState } from "react";
import "../style/LandingPage.css";
import logo from "../assets/logo.png";
import landingpage_1 from "../assets/landingpage_1.png";
import landingpage_2 from "../assets/landingpage_2.png";
import landingpage_3 from "../assets/landingpage_3.png";
import landingpage_4 from "../assets/landingpage_4.png";
import landingpage_5 from "../assets/landingpage_5.png";
import useNavigation from "../hooks/useNavigate";
import SignUpStep1 from "../popups-screens/SignUpStep1";
import SignUpStep2 from "../popups-screens/SignUpStep2";
import ExecutorSignUpStep1 from "../popups-screens/ExecutorSignUpStep1";
import ExecutorSignUpStep2 from "../popups-screens/ExecutorSignUpStep2";
import UserLoginForm from "../popups-screens/Login";
import ExecutorLoginForm from "../popups-screens/ExecutorLoginForm";
import RoleSelectionModal from "../popups-screens/RoleSelectionModal";

const LandingPage = () => {
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const { goToLogin, goToPrivacy } = useNavigation();
  const [step, setStep] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [nextAction, setNextAction] = useState(null); // "login" or "signup"

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (elementRef) => {
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoginClick = () => {
    setNextAction("login");
    setIsRoleModalOpen(true);
  };

  const handleOpenSignUp = (e) => {
    e.preventDefault();
    setNextAction("signup"); 
    setIsModalOpen(true);  // Opens sign-up modal directly
    setStep(1);
    document.body.style.overflow = "hidden";
  };
  

  const handleRoleSelected = (role) => {
    setSelectedRole(role);
    setIsRoleModalOpen(false);

    if (nextAction === "login") {
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    } else if (nextAction === "signup") {
      setStep(1);
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setSelectedRole(null);
    setNextAction(null);
    document.body.style.overflow = "auto";
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const RenderSignUpForms = () => {
    switch (step) {
      case 1:
        return <SignUpStep1 onNext={nextStep} />;
      case 2:
        return <SignUpStep2 onBack={prevStep} onClose={handleCloseModal} />;
      default:
        return null;
    }
  };
  

  const RenderLoginForm = () => {
    if (selectedRole === "user") {
      return <UserLoginForm onClose={handleCloseModal} />;
    } else if (selectedRole === "executor") {
      return <ExecutorLoginForm onClose={handleCloseModal} />;
    }
    return null;
  };
  
  const AuthModal = () => {
    if (!isModalOpen) return null; 
    return (
      <div className="landing-model-overlay" onClick={handleCloseModal}>
        <div className="landing-model-content" onClick={(e) => e.stopPropagation()}>
          {nextAction === "signup" ? RenderSignUpForms() : RenderLoginForm()}
        </div>
      </div>
    );
  };
  

  return (
    <div className="landing-page">
      <header className={`landing-page-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo"><img src={logo} alt="Logo" /></div>
        <nav>
          <a href="#" onClick={() => scrollToSection(aboutRef)}>About Us</a>
          <a href="#" onClick={() => scrollToSection(featuresRef)}>Features</a>
          <a href="#" onClick={() => scrollToSection(howItWorksRef)}>How It Works</a>
        </nav>
        <button className="login-btn" onClick={handleLoginClick}>Login</button>
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
        <p>
          In today's digital world, we leave behind countless online accounts, subscriptions, and digital assets...
          Our service helps you securely plan your digital afterlife by storing credentials, setting account actions,
          and assigning trusted executors to carry out your final digital wishes.
        </p>
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
          {[landingpage_1, landingpage_2, landingpage_3, landingpage_4, landingpage_5].map((img, index) => (
            <div className="step" key={index}>
              <div className={`step-content-${index % 2 === 0 ? "left" : "right"}`}>
                <h3>{index + 1} {[
                  "Sign Up & Secure Your Data",
                  "Assign a Trusted Executor",
                  "Set Your Account Preferences",
                  "Regular Updates",
                  "Execution After Death"
                ][index]}</h3>
                <p>{[
                  "Create an account and securely store your online assets using advanced encryption.",
                  "Select someone responsible for managing your assets when needed.",
                  "Specify what should happen to your accounts after your passing.",
                  "Keep your legacy updated by reviewing it every 1–2 years.",
                  "Your executor gets access after a secure verification to carry out your wishes."
                ][index]}</p>
              </div>
              <div className="landing-page-image"><img src={img} alt={`Step ${index + 1}`} /></div>
            </div>
          ))}
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

      {/* Role selection modal */}
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSelect={handleRoleSelected}
      />

      {/* Combined login/signup modal */}
      <AuthModal />
    </div>
  );
};

export default LandingPage;
