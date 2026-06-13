import { api } from "./api";
import { env } from "@/env";
import type { SignupFormData } from "@/schemas/user";

const signup = async (data: SignupFormData): Promise<void> => {
  await api(env.API_URL + "/api/auth/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export default signup;
