import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
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
      navigate("/yourcourses");
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
    });

    localStorage.removeItem("auth");

    window.location.href = "/";
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
        navigate("/");
        logout();
      });
  };

  const ucData = { loginUser, auth, registerUser, logout };

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
