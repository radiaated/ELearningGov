import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Signup = () => {
  const userCxt = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [academicLevel, setAcademicLevel] = useState("-1");
  const [gender, setGener] = useState("-1");

  const academicLevelList = [
    { short: "sec", title: "Secondary" },
    { short: "hsec", title: "Higher Secondary" },
    { short: "bch", title: "Bachelor" },
    { short: "mst", title: "Master" },
  ];

  return (
    <div className="w-full md:w-[60%]  mx-auto  mb-24">
      <div className="absolute bg-primary-light w-full h-[50%] top-0 left-0 z-[-1]"></div>
      <div className="bg-white shadow-lg py-10 pb-12 px-12 rounded-md relative">
        <div className="absolute bottom-5 left-10 text-xs text-red-500">
          {userCxt.errSignupMsg}
        </div>
        <div className="mt-4">
          Have account?{" "}
          <Link
            to="/login"
            className="text-primary-main underline underline-offset-2"
          >
            Login
          </Link>
        </div>
        <h2 className="text-3xl font-semibold mt-2">Signup</h2>
        <hr className="my-2" />
        <form
          className="sl-form"
          onSubmit={(e) => {
            e.preventDefault();

            userCxt.registerUser({
              username,
              email,
              password,
              full_name: fullName,
              gender,
              address,
              phone,
              academic_level: academicLevel,
            });
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
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div className="">
            <label>Gender</label>
            <div className="flex gap-2">
              <input
                type="radio"
                name="gender"
                value="m"
                onChange={(e) => setGener(e.target.value)}
              />{" "}
              <label>Male</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="gender"
                value="f"
                onChange={(e) => setGener(e.target.value)}
              />{" "}
              <label>Female</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="gender"
                value="o"
                onChange={(e) => setGener(e.target.value)}
              />{" "}
              <label>Other</label>
            </div>
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
          </div>
          <div>
            <label>Academic Level</label>
            <select
              value={academicLevel}
              onChange={(e) => setAcademicLevel(e.target.value)}
            >
              <option value="-1">Select</option>
              {academicLevelList.map((item, index) => (
                <option key={index} value={item.short}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Passowrd</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div>
            <input type="checkbox" /> Agree to Terms and Conditions
          </div>
          <input
            className="btn"
            type="submit"
            value={`${!userCxt.signing ? "Signup" : "Signing up..."}`}
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
