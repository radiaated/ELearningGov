import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../features/userSlice";
import UserContext from "../../context/UserContext";
import axios from "axios";

const Profile = () => {
  const { profile } = useSelector((state) => state.user);

  const userCxt = useContext(UserContext);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [prevPassword, setPrevPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [academicLevel, setAcademicLevel] = useState(null);
  const [gender, setGener] = useState(null);

  const academicLevelList = [
    { short: "sec", title: "Secondary" },
    { short: "hsec", title: "Higher Secondary" },
    { short: "bch", title: "Bachelor" },
    { short: "mst", title: "Master" },
  ];

  const updateUser = async (profile) => {
    const payload = {
      username: username ? username : profile.username,
      email: email ? email : profile.email,
      full_name: fullName ? fullName : profile.full_name,
      address: address ? address : profile.address,
      phone: phone ? phone : profile.phone,
      academic_level: academicLevel ? academicLevel : profile.academic_level,
      gender: gender ? gender : profile.gender,
    };

    await axios({
      method: "PUT",
      url: `${import.meta.env.VITE_API_URL}/api/user/profile/`,
      data: payload,
      withCredentials: true,
    }).then((res) => {
      console.log("updated");
    });
  };

  const updateUserPassword = async () => {
    const payload = {
      password: password,
      oldpassword: prevPassword,
    };

    await axios({
      method: "PUT",
      url: `${import.meta.env.VITE_API_URL}/api/user/profile/`,
      data: payload,
      withCredentials: true,
    }).then((res) => {
      console.log("updated");
    });
  };

  useEffect(() => {
    dispatch(fetchProfile(userCxt.auth.access));
  }, []);

  return (
    <div className="w-[60%] mx-auto ">
      <h2 className="text-3xl font-semibold mb-4">Profile</h2>
      <h3 className="text-2xl font-semibold mb-4">Details</h3>
      {!profile.profile.loading ? (
        <>
          <form
            className="sl-form"
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(profile.profile);
            }}
          >
            <div>
              <label>Username</label>
              <input
                type="username"
                value={
                  username !== null
                    ? username
                    : profile.profile.username
                    ? profile.profile.username
                    : ""
                }
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={
                  email !== null
                    ? email
                    : profile.profile.email
                    ? profile.profile.email
                    : ""
                }
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                value={
                  fullName !== null
                    ? fullName
                    : profile.profile.full_name
                    ? profile.profile.full_name
                    : ""
                }
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label>Gender</label>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="m"
                  onChange={(e) => setGener(e.target.value)}
                  defaultChecked={
                    profile.profile.gender && profile.profile.gender === "m"
                  }
                />{" "}
                Male
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="f"
                  onChange={(e) => setGener(e.target.value)}
                  defaultChecked={
                    profile.profile.gender && profile.profile.gender === "f"
                  }
                />{" "}
                Female
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="o"
                  onChange={(e) => setGener(e.target.value)}
                  defaultChecked={
                    profile.profile.gender && profile.profile.gender === "o"
                  }
                />{" "}
                Other
              </div>
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                value={
                  address !== null
                    ? address
                    : profile.profile.address
                    ? profile.profile.address
                    : ""
                }
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="text"
                value={
                  phone !== null
                    ? phone
                    : profile.profile.phone
                    ? profile.profile.phone
                    : ""
                }
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label>Academic Level</label>
              <select
                value={
                  academicLevel !== null
                    ? academicLevel
                    : profile.profile.academic_level
                    ? profile.profile.academic_level
                    : ""
                }
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
            <input
              className="btn w-fit cursor-pointer"
              type="submit"
              value="Update"
            />
          </form>
          <hr className="my-6" />
          <h3 className="text-2xl font-semibold mb-4">Change Password</h3>
          <form
            className="sl-form"
            onSubmit={(e) => {
              e.preventDefault();
              updateUserPassword();
            }}
          >
            <div>
              <label>Old Password</label>
              <input
                type="password"
                value={prevPassword}
                onChange={(e) => setPrevPassword(e.target.value)}
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
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <input
              className="btn w-fit cursor-pointer"
              type="submit"
              value="Update"
            />
          </form>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Profile;
