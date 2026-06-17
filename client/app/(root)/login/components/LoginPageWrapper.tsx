"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { LoginFormData } from "@/schemas/user";
import { loginSchema } from "@/schemas/user";

import { UnauthorizedError } from "@/app/lib/api";
import login from "@/app/lib/login";

type FormValues = LoginFormData;

const LoginPageWrapper = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
      window.location.href = "/";
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        const errorMessage = await error.response?.json();
        setError("root", {
          type: "server",
          message: errorMessage.detail,
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
            New here?{" "}
            <Link
              href="/signup"
              className="text-primary-dark underline underline-offset-2"
            >
              Create an account
            </Link>
          </div>

          <h2 className="text-3xl font-semibold mt-2">Login</h2>
          <hr className="my-4 text-zinc-400" />

          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            {/* Username */}
            <div>
              <label className="form-label">Username</label>
              <input
                {...register("username")}
                className="form-input"
                placeholder="Enter your username"
                autoComplete="username"
              />
              <p className="form-error">{errors.username?.message}</p>
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                {...register("password")}
                className="form-input"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <p className="form-error">{errors.password?.message}</p>
            </div>

            {/* Server error */}
            {errors.root?.message && (
              <div className="text-red-500 text-xs">{errors.root.message}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="form-button"
            >
              {isSubmitting ? (
                <span>
                  <i className="fa-solid fa-spinner animate-spin"></i> Logging
                  in
                </span>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPageWrapper;
