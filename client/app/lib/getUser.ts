import { api } from "./api";
import { env } from "@/env";

export type User = {
  username: string;
  email: string;
  is_admin: boolean;
};

const getUser = async (cookieHeader?: string | null): Promise<User> => {
  const res = await api(`${env.API_URL}/api/user/me/`, {
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

  return res?.json();
};

export default getUser;
