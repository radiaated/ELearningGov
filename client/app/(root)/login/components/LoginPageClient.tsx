"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { LoginFormData } from "@/schemas/user";
import { loginSchema } from "@/schemas/user";

import login from "@/app/lib/login";

type FormValues = LoginFormData;

const LoginPageClient = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setError("root", {
        type: "server",
        message,
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
            <input
              type="submit"
              value={isSubmitting ? "Logging in..." : "Login"}
              disabled={isSubmitting}
              className="form-button"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPageClient;
