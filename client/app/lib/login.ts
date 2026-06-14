import type { LoginFormData } from "@/schemas/user";

import { api } from "./api";
import { env } from "@/env";

const login = async (data: LoginFormData): Promise<void> => {
  await api(env.API_URL + "/api/auth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export default login;
