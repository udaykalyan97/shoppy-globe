import { useNavigate } from "react-router-dom";

export const handleGoHome = () => {
  const navigate = useNavigate();
  navigate('/');
};
