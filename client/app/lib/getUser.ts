import { api } from "./api";
import { env } from "@/env";
import type { CurrentUser } from "@/types/user";

const getUser = async (cookieHeader?: string | null): Promise<CurrentUser> => {
  const res = await api(`${env.API_URL}/api/user/me/`, {
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

  return res?.json();
};

export default getUser;
