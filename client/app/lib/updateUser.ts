import type { ProfileFormData } from "@/schemas/user";

import { api } from "./api";
import { env } from "@/env";

const updateUser = async (
  payload: ProfileFormData,
  cookieHeader?: string | null,
): Promise<ProfileFormData> => {
  const response = await api(`${env.API_URL}/api/user/profile/`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

  const data = response?.json();

  return data;
};

export default updateUser;
