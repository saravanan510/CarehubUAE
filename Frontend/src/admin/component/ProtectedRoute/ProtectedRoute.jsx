import { Navigate } from "react-router";
import { useAuth } from "../../../context/Context";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth.loggedIn ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
