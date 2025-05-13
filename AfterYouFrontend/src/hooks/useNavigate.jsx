import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const goToLogin = (role = "user") => navigate(`/login/${role}`);
  const goToPrivacy = () => navigate("/privacy-policy");
  const goToProfile = () => navigate("/profile");
  const goToHome = () => navigate("/home");
  const goToAccounts = () => navigate("/accounts");
  const goToExecutors = () => navigate("/executors");
  const goToUser = () => navigate("/user");
  const goToSubscription = () => navigate("/subscriptionForm");
  const goToDeathCertificateUpload = () => navigate("/deathcertificateupload");
  const goToSubscriptionForm = () => navigate("/subscriptionform");
  const goToExecutorExecutingProcess = () => navigate("/executorExecutingProcess");
  const goToAssignExecutor = () => navigate("/assignexecutor");
  const goToRegisterLawyer = () => navigate("/registerlawyer" );

  const refreshPage = () => {
    window.location.reload(); // Assuming you meant this
  };

  return {
    goToLogin,
    goToPrivacy,
    goToProfile,
    goToAccounts,
    goToExecutors,
    goToUser,
    goToHome,
    goToDeathCertificateUpload,
    goToSubscription,
    goToAssignExecutor,
    refreshPage,
    goToRegisterLawyer,
    goToSubscriptionForm,
    goToExecutorExecutingProcess,
  };
};

export default useNavigation;