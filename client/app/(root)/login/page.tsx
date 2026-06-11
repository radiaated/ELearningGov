"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "@/app/lib/api";
import { env } from "@/env";

const schema = yup.object({
  username: yup.string().required("Username is required"),

  password: yup.string().required("Password is required"),
});

type LoginFormData = yup.InferType<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await api(env.API_URL + "/api/auth/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    } catch (err) {
      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="w-full md:w-[60%] mx-auto mb-24">
      <div className="absolute bg-primary-light w-full h-[50%] top-0 left-0 z-[-1]" />

      <div className="bg-white shadow-lg py-10 pb-12 px-12 rounded-md relative">
        <div className="mt-4">
          New?{" "}
          <Link
            href="/signup"
            className="text-primary-main underline underline-offset-2"
          >
            Signup
          </Link>
        </div>

        <h2 className="text-3xl font-semibold mt-2">Login</h2>
        <hr className="my-2" />

        <form className="sl-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div>
            <label>Username</label>
            <input {...register("username")} />
            <p className="text-red-500 text-xs">{errors.username?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <input type="password" {...register("password")} />
            <p className="text-red-500 text-xs">{errors.password?.message}</p>
          </div>

          <input
            className="btn"
            type="submit"
            value={isSubmitting ? "Logging in..." : "Login"}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
