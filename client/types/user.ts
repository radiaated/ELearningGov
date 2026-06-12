import * as yup from "yup";
export interface CurrentUser {
  username: string;
  is_admin: boolean;
}

export const loginSchema = yup.object({
  username: yup.string().required("Username is required"),

  password: yup.string().required("Password is required"),
});
export const signupSchema = yup.object({
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

export const profileSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  first_name: yup.string().required("Full name is required"),
  gender: yup.string().oneOf(["m", "f", "o", ""]).required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  academic_level: yup.string().required("Academic level is required"),
});

export const passwordSchema = yup.object({
  old_password: yup.string().required("Old password is required"),
  password: yup.string().min(6, "Min 6 characters").required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required(),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
export type ProfileFormData = yup.InferType<typeof profileSchema>;
export type PasswordFormData = yup.InferType<typeof passwordSchema>;
