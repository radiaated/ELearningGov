import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );

  const loginUser = async (payload) => {
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/user/token/`,
      data: payload,
    }).then((res) => {
      localStorage.setItem("auth", JSON.stringify(res.data));
      setAuth(res.data);
    });
  };

  const registerUser = async (payload) => {
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/user/register/`,
      data: payload,
    }).then((res) => {
      loginUser({ username: payload.username, password: payload.password });
    });
  };

  const ucData = { loginUser, auth, registerUser };

  return <UserContext.Provider value={ucData}>{children}</UserContext.Provider>;
};

export default UserContext;
