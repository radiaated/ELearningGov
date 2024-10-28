import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userCxt = useContext(UserContext);

  return (
    <div className="w-[30%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="absolute bg-primary-light w-full h-[50%] top-0 left-0 z-[-1]"></div>
      <div className="bg-white shadow-lg py-10 pb-12 px-12 rounded-md relative">
        <div className="absolute bottom-5 left-10 text-xs text-red-500">
          {userCxt.errLoginMsg}
        </div>

        <h2 className="text-3xl font-semibold mb-4">Login</h2>
        <hr className="my-2" />
        <form
          className="sl-form"
          onSubmit={(e) => {
            e.preventDefault();
            userCxt.loginUser({ username, password });
          }}
        >
          <div>
            <label>Username</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <input
            className="btn"
            type="submit"
            value={`${!userCxt.logging ? "Login" : "Logging in..."}`}
          />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
