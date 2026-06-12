import { api } from "./api";
import { env } from "@/env";
import { LoginFormData } from "@/types/user";

const signup = async (data: LoginFormData): Promise<void> => {
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
