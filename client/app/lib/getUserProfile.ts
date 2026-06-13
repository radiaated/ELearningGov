import { api } from "./api";
import { env } from "@/env";

import type { ProfileFormData } from "@/schemas/user";

const getUserProfile = async (
  cookieHeader?: string | null,
): Promise<ProfileFormData> => {
  const res = await api(`${env.API_URL}/api/user/profile/`, {
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

  return res?.json();
};

export default getUserProfile;
