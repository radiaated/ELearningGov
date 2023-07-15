import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userCxt = useContext(UserContext);

  return <>{userCxt.auth ? children : <Navigate to={"/login"} />}</>;
};

export default PrivateRoute;
