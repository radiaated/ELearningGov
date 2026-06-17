"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "sonner";

import type { ProfileFormData, PasswordFormData } from "@/schemas/user";
import { profileSchema, passwordSchema } from "@/schemas/user";

import { BadRequestError } from "@/app/lib/api";
import getUserProfile from "@/app/lib/getUserProfile";
import updateUser from "@/app/lib/updateUser";
import updateUserPassword from "@/app/lib/updatePassword";

import { academicLevelCategories, genderOptions } from "@/data/user";

const ProfilePageWrapper = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
  });

  const {
    register: registerPwd,
    handleSubmit: handlePwdSubmit,
    reset: resetPwd,
    formState: { errors: pwdErrors, isSubmitting: pwdSubmitting },
    setError: setPwdError,
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
  });

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
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
      toast.error("Failed to fetch profile");
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (data: ProfileFormData) => {
    try {
      const profile = await updateUser(data);
      reset(profile);
      toast.success("Profile updated successfully!");
    } catch (err) {
      if (err instanceof BadRequestError) {
        const validationMessage = await err.response?.json();
        Object.entries(validationMessage).forEach(([field, messages]) => {
          setError(field as keyof ProfileFormData, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : String(messages),
          });
        });
        return;
      }
      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const updatePassword = async (data: PasswordFormData) => {
    try {
      await updateUserPassword(data);
      resetPwd();
      toast.success("Password updated successfully!");
    } catch (err) {
      if (err instanceof BadRequestError) {
        const validationMessage = await err.response?.json();
        Object.entries(validationMessage).forEach(([field, messages]) => {
          setPwdError(field as keyof PasswordFormData, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : String(messages),
          });
        });
        return;
      }
      setPwdError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <section>
      <div className="section-container my-8 md:w-1/2">
        <div className="fixed bg-primary-light w-full h-[50%] top-0 left-0 -z-10" />

        {loading ? (
          <div className="text-4xl text-zinc-50 text-center">
            <i className="fa-solid fa-spinner animate-spin"></i>
          </div>
        ) : (
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
                <input
                  {...register("username")}
                  className="form-input"
                  placeholder="Enter username"
                />
                <p className="form-error">{errors.username?.message}</p>
              </div>

              <div>
                <label className="form-label">Email</label>
                <input
                  {...register("email")}
                  className="form-input"
                  placeholder="Enter email address"
                />
                <p className="form-error">{errors.email?.message}</p>
              </div>

              <div>
                <label className="form-label">Full Name</label>
                <input
                  {...register("first_name")}
                  className="form-input"
                  placeholder="Enter full name"
                />
                <p className="form-error">{errors.first_name?.message}</p>
              </div>

              <div>
                <label className="form-label">Gender</label>

                <div className="flex gap-4 text-sm">
                  {genderOptions.map((g) => (
                    <label key={g.value} className="form-radio-label">
                      <input
                        type="radio"
                        value={g.value}
                        {...register("gender")}
                      />
                      {g.label}
                    </label>
                  ))}
                </div>

                <p className="form-error">{errors.gender?.message}</p>
              </div>

              <div>
                <label className="form-label">Address</label>
                <input
                  {...register("address")}
                  className="form-input"
                  placeholder="Enter address"
                />
                <p className="form-error">{errors.address?.message}</p>
              </div>

              <div>
                <label className="form-label">Phone</label>
                <input
                  {...register("phone")}
                  className="form-input"
                  placeholder="Enter phone number"
                />
                <p className="form-error">{errors.phone?.message}</p>
              </div>

              <div>
                <label className="form-label">Academic Level</label>
                <select {...register("academic_level")} className="form-input">
                  <option value="">Select</option>
                  {academicLevelCategories.map((item, idx) => (
                    <option key={idx} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <p className="form-error">{errors.academic_level?.message}</p>
              </div>
              {errors.root?.message && (
                <div className="form-error">{errors.root.message}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="form-button"
              >
                {isSubmitting ? (
                  <span>
                    <i className="fa-solid fa-spinner animate-spin"></i>{" "}
                    Updating
                  </span>
                ) : (
                  <span>Update</span>
                )}
              </button>
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
                  placeholder="Enter old password"
                />
                <p className="form-error">{pwdErrors.old_password?.message}</p>
              </div>

              <div>
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  {...registerPwd("password")}
                  className="form-input"
                  placeholder="Enter new password"
                />
                <p className="form-error">{pwdErrors.password?.message}</p>
              </div>

              <div>
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  {...registerPwd("password2")}
                  className="form-input"
                  placeholder="Confirm new password"
                />
                <p className="form-error">{pwdErrors.password2?.message}</p>
              </div>

              {pwdErrors.root?.message && (
                <div className="form-error">{pwdErrors.root.message}</div>
              )}

              <button
                type="submit"
                disabled={pwdSubmitting}
                className="form-button"
              >
                {pwdSubmitting ? (
                  <span>
                    <i className="fa-solid fa-spinner animate-spin"></i>{" "}
                    Updating
                  </span>
                ) : (
                  <span>Update</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePageWrapper;
