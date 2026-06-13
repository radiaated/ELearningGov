"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema } from "@/schemas/user";
import type { SignupFormData } from "@/schemas/user";

import signup from "@/app/lib/signup";

import { academicLevelCategories, genderOptions } from "@/data/user";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      academic_level: "",
      gender: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      await signup(data);
    } catch {
      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section>
      <div className="section-container my-16 md:w-1/2">
        <div className="fixed bg-primary-light w-full h-[50%] top-0 left-0 -z-10" />
        <div className="bg-white drop-shadow-2xl py-10 pb-12 px-12 rounded-md relative">
          <div className="mt-4 text-sm">
            Have account?{" "}
            <Link
              href="/login"
              className="text-primary-dark underline underline-offset-2"
            >
              Login
            </Link>
          </div>

          <h2 className="text-3xl font-semibold mt-2">Signup</h2>
          <hr className="my-4 text-zinc-400" />

          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            {/* Username */}
            <div>
              <label className="form-label">Username</label>
              <input
                {...register("username")}
                className="form-input"
                placeholder="Enter your username"
              />
              <p className="form-error">{errors.username?.message}</p>
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                {...register("email")}
                className="form-input"
                placeholder="example@mail.com"
              />
              <p className="form-error">{errors.email?.message}</p>
            </div>

            {/* Full Name */}
            <div>
              <label className="form-label">Full Name</label>
              <input
                {...register("first_name")}
                className="form-input"
                placeholder="Enter your full name"
              />
              <p className="form-error">{errors.first_name?.message}</p>
            </div>

            {/* Gender */}
            <div>
              <label className="form-label">Gender</label>

              <div className="form-radio-group">
                {genderOptions.map((g) => (
                  <label key={g.value} className="form-radio-label">
                    <input
                      type="radio"
                      value={g.value}
                      {...register("gender")}
                      className="w-4 h-4 text-primary-main focus:ring-primary-main"
                    />
                    {g.label}
                  </label>
                ))}
              </div>

              <p className="form-error">{errors.gender?.message}</p>
            </div>

            {/* Address */}
            <div>
              <label className="form-label">Address</label>
              <input
                {...register("address")}
                className="form-input"
                placeholder="Enter your address"
              />
              <p className="form-error">{errors.address?.message}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="form-label">Phone</label>
              <input
                {...register("phone")}
                className="form-input"
                placeholder="Enter phone number"
              />
              <p className="form-error">{errors.phone?.message}</p>
            </div>

            {/* Academic Level */}
            <div>
              <label className="form-label">Academic Level</label>
              <select {...register("academic_level")} className="form-input">
                <option value="">Select academic level</option>
                {academicLevelCategories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </select>
              <p className="form-error">{errors.academic_level?.message}</p>
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                {...register("password")}
                className="form-input"
                placeholder="Enter password"
              />
              <p className="form-error">{errors.password?.message}</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                {...register("password2")}
                className="form-input"
                placeholder="Re-enter password"
              />
              <p className="form-error">{errors.password2?.message}</p>
            </div>

            {/* Terms */}
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                {...register("terms")}
                className="w-4 h-4 text-primary-main rounded focus:ring-primary-main"
              />
              Agree to Terms and Conditions
            </label>

            {/* Server error */}
            {errors.root?.message && (
              <div className="text-red-500 text-xs">{errors.root.message}</div>
            )}

            {/* Submit */}
            <input
              type="submit"
              value={isSubmitting ? "Signing up..." : "Signup"}
              disabled={isSubmitting}
              className="form-button"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
