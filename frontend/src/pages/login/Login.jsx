import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userCxt = useContext(UserContext);

  return (
    <div className="w-[40%] mx-auto ">
      <h2 className="text-3xl font-semibold mb-4">Login</h2>
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
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input className="btn" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
