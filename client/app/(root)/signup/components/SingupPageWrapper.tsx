"use client";

import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import type { SignupFormData } from "@/schemas/user";
import { signupSchema } from "@/schemas/user";

import { BadRequestError } from "@/app/lib/api";
import signup from "@/app/lib/signup";
import login from "@/app/lib/login";

import { academicLevelCategories, genderOptions } from "@/data/user";

const SingupPageWrapper = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
      await login(data);
      window.location.href = "/";
    } catch (err) {
      if (err instanceof BadRequestError) {
        const validationMessage = await err.response?.json();
        Object.entries(validationMessage).forEach(([field, messages]) => {
          setError(field as keyof SignupFormData, {
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
                type="email"
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

              <div className="form-radio-group">
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
                <option value="">Select academic level</option>
                {academicLevelCategories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <p className="form-error">{errors.academic_level?.message}</p>
            </div>

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

            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                {...register("password2")}
                className="form-input"
                placeholder="Confirm password"
              />
              <p className="form-error">{errors.password2?.message}</p>
            </div>

            <label className="form-checkbox-label">
              <input type="checkbox" {...register("terms")} />
              Agree to Terms and Conditions
            </label>

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
                  <i className="fa-solid fa-spinner animate-spin"></i> Signing
                  up
                </span>
              ) : (
                <span>Signup</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SingupPageWrapper;
