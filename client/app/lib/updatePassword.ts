import { api } from "./api";
import { env } from "@/env";

import { PasswordFormData } from "@/types/user";

const updateUserPassword = async (
  data: PasswordFormData,
  cookieHeader?: string | null,
): Promise<void> => {
  await api(`${env.API_URL}/api/user/password-update/`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });
};

export default updateUserPassword;
