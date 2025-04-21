import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToPrivacy = () => {
    navigate("/privacy-policy");
  };

  const goToProfile = () => {
    navigate("/profile");
  }

  const goToHome = () => {
    navigate("/home");
  } 

  const goToAccounts = () => {
    navigate("/accounts");
  }

  const goToExecutors = () => {
    navigate("/executors");
  }

  const goToUser = () => {
    navigate("/user");
  }

  const goToSubscription = () => {  
    navigate("/subscription");
  }

  return {
    goToLogin,
    goToPrivacy,
    goToProfile,
    goToAccounts,
    goToExecutors,
    goToUser,
    goToHome,
    goToSubscription
  };
};

export default useNavigation;