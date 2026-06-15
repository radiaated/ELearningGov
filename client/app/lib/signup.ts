import type { SignupFormData } from "@/schemas/user";

import { api } from "./api";
import { env } from "@/env";

const signup = async (formData: SignupFormData): Promise<void> => {
  const response = await api(env.API_URL + "/api/auth/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await response?.json();

  return data;
};

export default signup;
