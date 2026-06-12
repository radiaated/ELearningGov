import { api } from "./api";
import { env } from "@/env";

import { ProfileFormData } from "@/types/user";

const updateUser = async (
  data: ProfileFormData,
  cookieHeader?: string | null,
) => {
  await api(env.API_URL + "/api/user/profile/", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader ? cookieHeader : undefined,
    },
    credentials: cookieHeader ? undefined : "include",
  });
};

export default updateUser;
