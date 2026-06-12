"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { academicLevelCategories } from "@/data/user";
import { api } from "@/app/lib/api";
import { env } from "@/env";

import {
  profileSchema,
  ProfileFormData,
  passwordSchema,
  PasswordFormData,
} from "@/types/user";
import getUser from "@/app/lib/getUser";
import getUserProfile from "@/app/lib/getUserProfile";
import updateUser from "@/app/lib/updateUser";
import updateUserPassword from "@/app/lib/updatePassword";

const ProfilePage = () => {
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

  const {
    register: registerPwd,
    handleSubmit: handlePwdSubmit,
    reset: resetPwd,
    formState: { errors: pwdErrors },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
  });

  const fetchUserProfile = async () => {
    try {
      const userProfile = await getUserProfile();

      reset({
        username: userProfile.username ?? "",
        email: userProfile.email ?? "",
        first_name: userProfile.first_name ?? "",
        gender: userProfile.gender ?? "",
        address: userProfile.address ?? "",
        phone: userProfile.phone ?? "",
        academic_level: userProfile.academic_level ?? "",
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };
  // ----------------------
  // Update profile
  // ----------------------
  const updateUserProfile = async (data: ProfileFormData) => {
    await updateUser(data);
  };

  // ----------------------
  // Update password
  // ----------------------
  const updatePassword = async (data: PasswordFormData) => {
    await updateUserPassword(data);

    resetPwd();
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="w-full md:w-[60%] mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Profile</h2>

      {/* ---------------- PROFILE FORM ---------------- */}
      <form className="sl-form" onSubmit={handleSubmit(updateUserProfile)}>
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

      <form className="sl-form" onSubmit={handlePwdSubmit(updatePassword)}>
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
