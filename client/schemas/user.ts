import * as yup from "yup";

import { academicLevelCategories, genderOptions } from "@/data/user";

export const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const signupSchema = yup.object({
  username: yup.string().required("Username is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  first_name: yup.string().required("Full name is required"),

  gender: yup
    .string()
    .oneOf(
      ["", ...genderOptions.map((item) => item.value)],
      "Please select a valid gender",
    )
    .required("Gender is required"),

  address: yup.string().required("Address is required"),

  phone: yup.string().required("Phone number is required"),

  academic_level: yup
    .string()
    .oneOf(
      ["", ...academicLevelCategories.map((item) => item.value)],
      "Please select a valid academic level",
    )
    .required("Academic level is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),

  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Terms and conditions are required"),
});

export const profileSchema = yup.object({
  username: yup.string().required("Username is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  first_name: yup.string().required("Full name is required"),

  gender: yup
    .string()
    .oneOf(["m", "f", "o", ""], "Please select a valid gender")
    .required("Gender is required"),

  address: yup.string().required("Address is required"),

  phone: yup.string().required("Phone number is required"),

  academic_level: yup.string().required("Academic level is required"),
});

export const passwordSchema = yup.object({
  old_password: yup.string().required("Old password is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),

  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your new password"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
export type ProfileFormData = yup.InferType<typeof profileSchema>;
export type PasswordFormData = yup.InferType<typeof passwordSchema>;
