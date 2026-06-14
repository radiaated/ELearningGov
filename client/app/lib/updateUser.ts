import type { ProfileFormData } from "@/schemas/user";

import { api } from "./api";
import { env } from "@/env";

const updateUser = async (
  data: ProfileFormData,
  cookieHeader?: string | null,
): Promise<void> => {
  await api(`${env.API_URL}/api/user/profile/`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });
};

export default updateUser;
