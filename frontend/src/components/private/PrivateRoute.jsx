import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.token);
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
