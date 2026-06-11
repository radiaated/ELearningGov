"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "@/app/lib/api";
import { env } from "@/env";
import { academicLevelCategories } from "@/data/user";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  first_name: yup.string().required("Full name is required"),
  gender: yup.string().oneOf(["", "m", "f", "o"], "Select gender").required(),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone is required"),
  academic_level: yup.string().notOneOf(["-1"], "Select academic level"),
  password: yup.string().min(6, "Min 6 characters").required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

type SignupFormData = yup.InferType<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      academic_level: "",
      gender: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await api(env.API_URL + "/api/auth/register/", {
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
          Have account?{" "}
          <Link
            href="/login"
            className="text-primary-main underline underline-offset-2"
          >
            Login
          </Link>
        </div>

        <h2 className="text-3xl font-semibold mt-2">Signup</h2>
        <hr className="my-2" />

        <form className="sl-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div>
            <label>Username</label>
            <input {...register("username")} />
            <p className="text-red-500 text-xs">{errors.username?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <input type="email" {...register("email")} />
            <p className="text-red-500 text-xs">{errors.email?.message}</p>
          </div>

          {/* Full Name */}
          <div>
            <label>Full Name</label>
            <input {...register("first_name")} />
            <p className="text-red-500 text-xs">{errors.first_name?.message}</p>
          </div>

          {/* Gender */}
          <div>
            <label>Gender</label>

            <div className="flex gap-2">
              <input type="radio" value="m" {...register("gender")} /> Male
            </div>
            <div className="flex gap-2">
              <input type="radio" value="f" {...register("gender")} /> Female
            </div>
            <div className="flex gap-2">
              <input type="radio" value="o" {...register("gender")} /> Other
            </div>

            <p className="text-red-500 text-xs">{errors.gender?.message}</p>
          </div>

          {/* Address */}
          <div>
            <label>Address</label>
            <input {...register("address")} />
            <p className="text-red-500 text-xs">{errors.address?.message}</p>
          </div>

          {/* Phone */}
          <div>
            <label>Phone</label>
            <input {...register("phone")} />
            <p className="text-red-500 text-xs">{errors.phone?.message}</p>
          </div>

          {/* Academic Level */}
          <div>
            <label>Academic Level</label>
            <select {...register("academic_level")}>
              <option value="">Select</option>
              {academicLevelCategories.map((item, index) => (
                <option key={index} value={item.short}>
                  {item.title}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-xs">
              {errors.academic_level?.message}
            </p>
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <input type="password" {...register("password")} />
            <p className="text-red-500 text-xs">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label>Confirm Password</label>
            <input type="password" {...register("password2")} />
            <p className="text-red-500 text-xs">{errors.password2?.message}</p>
          </div>

          <div>
            <input type="checkbox" /> Agree to Terms and Conditions
          </div>
          {errors.root?.message && (
            <div className="text-red-500 text-xs my-2">
              {errors.root.message}
            </div>
          )}
          <input
            className="btn"
            type="submit"
            value={isSubmitting ? "Signing up..." : "Signup"}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
