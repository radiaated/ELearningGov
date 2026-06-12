import { api } from "./api";
import { env } from "@/env";

import { PasswordFormData } from "@/types/user";

const updateUserPassword = async (
  data: PasswordFormData,
  cookieHeader?: string | null,
) => {
  await api(env.API_URL + "/api/user/password-update/", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader ? cookieHeader : undefined,
    },
    credentials: cookieHeader ? undefined : "include",
  });
};

export default updateUserPassword;
