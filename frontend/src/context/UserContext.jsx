import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [logging, setLogging] = useState(false);
  const [signing, setSigning] = useState(false);
  const [errLoginMsg, setLoginErrMsg] = useState(null);
  const [errSignupMsg, setErrSignupErrMsg] = useState(null);

  const [auth, setAuth] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );

  const loginUser = async (payload) => {
    setLoginErrMsg(null);
    setLogging(true);
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/user/token/`,
      data: payload,
    })
      .then((res) => {
        localStorage.setItem("auth", JSON.stringify(res.data));
        setAuth(res.data);
        navigate("/yourcourses");
      })
      .catch((err) => {
        setLoginErrMsg(err.response.data.detail);
      })
      .finally(() => {
        setLogging(false);
      });
  };

  const logout = async () => {
    const authLS = JSON.parse(localStorage.getItem("auth"));

    await axios({
      url: `${import.meta.env.VITE_API_URL}/api/user/token/refresh/`,
      method: "POST",
      data: { refresh: authLS.refresh },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authLS.access}`,
      },
    })
      .then((res) => {
        localStorage.removeItem("auth");
        window.location.href = "/";
      })
      .catch((err) => {
        localStorage.removeItem("auth");
        window.location.href = "/";
      });
  };

  const registerUser = async (payload) => {
    setErrSignupErrMsg(null);
    setSigning(true);
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/user/register/`,
      data: payload,
    })
      .then((res) => {
        loginUser({ username: payload.username, password: payload.password });
      })
      .catch((err) => {
        setErrSignupErrMsg(err.response.data.detail);
      })
      .finally(() => {
        setSigning(false);
      });
  };

  const refresh = async () => {
    const authLS = JSON.parse(localStorage.getItem("auth"));

    await axios({
      url: `${import.meta.env.VITE_API_URL}/api/user/token/refresh/`,
      method: "POST",
      data: { refresh: authLS.refresh },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authLS.access}`,
      },
    })
      .then((res) => {
        setAuth(res.data);
        localStorage.setItem("auth", JSON.stringify(res.data));
      })
      .catch((err) => {
        logout();
        // navigate("/");
      });
  };

  const ucData = {
    loginUser,
    auth,
    registerUser,
    logout,
    logging,
    signing,
    errLoginMsg,
    errSignupMsg,
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      let t = setInterval(() => {
        refresh();
      }, 1000 * 15);
    }
    return () => {
      if (localStorage.getItem("auth")) {
        clearInterval(t);
        refresh();
      }
    };
  }, []);

  return <UserContext.Provider value={ucData}>{children}</UserContext.Provider>;
};

export default UserContext;
