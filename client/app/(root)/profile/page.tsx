"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { academicLevelCategories } from "@/data/user";
import { api } from "@/app/lib/api";
import { env } from "@/env";

// ----------------------
// Validation Schema
// ----------------------
const profileSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  first_name: yup.string().required("Full name is required"),
  gender: yup.string().oneOf(["m", "f", "o", ""]).required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  academic_level: yup.string().required("Academic level is required"),
});

const passwordSchema = yup.object({
  old_password: yup.string().required("Old password is required"),
  password: yup.string().min(6, "Min 6 characters").required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required(),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;
type PasswordFormData = yup.InferType<typeof passwordSchema>;

const ProfilePage = () => {
  // ----------------------
  // Profile form
  // ----------------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: "",
      email: "",
      first_name: "",
      gender: "",
      address: "",
      phone: "",
      academic_level: "",
    },
  });

  // ----------------------
  // Password form
  // ----------------------
  const {
    register: registerPwd,
    handleSubmit: handlePwdSubmit,
    reset: resetPwd,
    formState: { errors: pwdErrors },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
  });

  // ----------------------
  // Fetch profile
  // ----------------------
  const fetchUserProfile = async () => {
    try {
      const response = await api(env.API_URL + "/api/user/profile/", {
        credentials: "include",
      });

      const data = await response?.json();

      if (!data) return;

      // IMPORTANT: map API response -> form fields
      reset({
        username: data.username ?? "",
        email: data.email ?? "",
        first_name: data.first_name ?? "",
        gender: data.gender ?? "",
        address: data.address ?? "",
        phone: data.phone ?? "",
        academic_level: data.academic_level ?? "",
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ----------------------
  // Update profile
  // ----------------------
  const updateUser = async (data: ProfileFormData) => {
    await api(env.API_URL + "/api/user/profile/", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  // ----------------------
  // Update password
  // ----------------------
  const updateUserPassword = async (data: PasswordFormData) => {
    await api(env.API_URL + "/api/user/password-update/", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    resetPwd();
  };

  return (
    <div className="w-full md:w-[60%] mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Profile</h2>

      {/* ---------------- PROFILE FORM ---------------- */}
      <form className="sl-form" onSubmit={handleSubmit(updateUser)}>
        <div>
          <label>Username</label>
          <input {...register("username")} />
          <p>{errors.username?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label>Full Name</label>
          <input {...register("first_name")} />
          <p>{errors.first_name?.message}</p>
        </div>

        <div>
          <label>Gender</label>
          <label>
            <input type="radio" value="m" {...register("gender")} /> Male
          </label>
          <label>
            <input type="radio" value="f" {...register("gender")} /> Female
          </label>
          <label>
            <input type="radio" value="o" {...register("gender")} /> Other
          </label>
          <p>{errors.gender?.message}</p>
        </div>

        <div>
          <label>Address</label>
          <input {...register("address")} />
          <p>{errors.address?.message}</p>
        </div>

        <div>
          <label>Phone</label>
          <input {...register("phone")} />
          <p>{errors.phone?.message}</p>
        </div>

        <div>
          <label>Academic Level</label>
          <select {...register("academic_level")}>
            <option value="">Select</option>
            {academicLevelCategories.map((item, idx) => (
              <option key={idx} value={item.short}>
                {item.title}
              </option>
            ))}
          </select>
          <p>{errors.academic_level?.message}</p>
        </div>

        <button className="btn" type="submit">
          Update
        </button>
      </form>

      <hr className="my-6" />

      {/* ---------------- PASSWORD FORM ---------------- */}
      <h3 className="text-2xl font-semibold mb-4">Change Password</h3>

      <form className="sl-form" onSubmit={handlePwdSubmit(updateUserPassword)}>
        <div>
          <label>Old Password</label>
          <input type="password" {...registerPwd("old_password")} />
          <p>{pwdErrors.old_password?.message}</p>
        </div>

        <div>
          <label>New Password</label>
          <input type="password" {...registerPwd("password")} />
          <p>{pwdErrors.password?.message}</p>
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" {...registerPwd("password2")} />
          <p>{pwdErrors.password2?.message}</p>
        </div>

        <button className="btn" type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
