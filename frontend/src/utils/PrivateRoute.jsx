import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userCxt = useContext(UserContext);

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (userCxt.auth) {
      setDisplay(true);
    }
  }, [userCxt.auth]);

  return <>{display ? children : ""}</>;
};

export default PrivateRoute;
