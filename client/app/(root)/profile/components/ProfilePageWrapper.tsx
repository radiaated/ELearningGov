"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { academicLevelCategories } from "@/data/user";

import { profileSchema, passwordSchema } from "@/schemas/user";
import type { ProfileFormData, PasswordFormData } from "@/schemas/user";

import getUserProfile from "@/app/lib/getUserProfile";
import updateUser from "@/app/lib/updateUser";
import updateUserPassword from "@/app/lib/updatePassword";

const ProfilePageWrapper = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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
    formState: { errors: pwdErrors, isSubmitting: pwdSubmitting },
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

  const updateUserProfile = async (data: ProfileFormData) => {
    await updateUser(data);
  };

  const updatePassword = async (data: PasswordFormData) => {
    await updateUserPassword(data);
    resetPwd();
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <section>
      <div className="section-container my-8 md:w-1/2">
        <div className="fixed bg-primary-light w-full h-[50%] top-0 left-0 -z-10" />

        <div className="bg-white drop-shadow-2xl py-10 pb-12 px-12 rounded-md relative">
          <h2 className="text-3xl font-semibold">Profile</h2>
          <hr className="my-4 text-zinc-400" />

          {/* Profile form */}
          <form
            className="form-container"
            onSubmit={handleSubmit(updateUserProfile)}
          >
            <div>
              <label className="form-label">Username</label>
              <input {...register("username")} className="form-input" />
              <p className="form-error">{errors.username?.message}</p>
            </div>

            <div>
              <label className="form-label">Email</label>
              <input {...register("email")} className="form-input" />
              <p className="form-error">{errors.email?.message}</p>
            </div>

            <div>
              <label className="form-label">Full Name</label>
              <input {...register("first_name")} className="form-input" />
              <p className="form-error">{errors.first_name?.message}</p>
            </div>

            <div>
              <label className="form-label">Gender</label>

              <div className="flex gap-4 text-sm">
                <label>
                  <input type="radio" value="m" {...register("gender")} /> Male
                </label>
                <label>
                  <input type="radio" value="f" {...register("gender")} />{" "}
                  Female
                </label>
                <label>
                  <input type="radio" value="o" {...register("gender")} /> Other
                </label>
              </div>

              <p className="form-error">{errors.gender?.message}</p>
            </div>

            <div>
              <label className="form-label">Address</label>
              <input {...register("address")} className="form-input" />
              <p className="form-error">{errors.address?.message}</p>
            </div>

            <div>
              <label className="form-label">Phone</label>
              <input {...register("phone")} className="form-input" />
              <p className="form-error">{errors.phone?.message}</p>
            </div>

            <div>
              <label className="form-label">Academic Level</label>
              <select {...register("academic_level")} className="form-input">
                <option value="">Select</option>
                {academicLevelCategories.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </select>
              <p className="form-error">{errors.academic_level?.message}</p>
            </div>

            <input
              type="submit"
              value={isSubmitting ? "Updating..." : "Update Profile"}
              disabled={isSubmitting}
              className="form-button"
            />
          </form>

          <hr className="my-8 text-zinc-300" />

          {/* Password form */}
          <h3 className="text-2xl font-semibold mb-4">Change Password</h3>

          <form
            className="form-container"
            onSubmit={handlePwdSubmit(updatePassword)}
          >
            <div>
              <label className="form-label">Old Password</label>
              <input
                type="password"
                {...registerPwd("old_password")}
                className="form-input"
              />
              <p className="form-error">{pwdErrors.old_password?.message}</p>
            </div>

            <div>
              <label className="form-label">New Password</label>
              <input
                type="password"
                {...registerPwd("password")}
                className="form-input"
              />
              <p className="form-error">{pwdErrors.password?.message}</p>
            </div>

            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                {...registerPwd("password2")}
                className="form-input"
              />
              <p className="form-error">{pwdErrors.password2?.message}</p>
            </div>

            <input
              type="submit"
              value={pwdSubmitting ? "Updating..." : "Update Password"}
              disabled={pwdSubmitting}
              className="form-button"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePageWrapper;
