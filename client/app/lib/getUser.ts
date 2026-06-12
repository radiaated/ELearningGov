import { api } from "./api";
import { env } from "@/env";

export type User = {
  username: string;
  email: string;
  is_admin: boolean;
};

const USER_ME_URL = new URL("/api/user/me/", env.API_URL).toString();

export default async function getUser(
  cookieHeader?: string | null,
): Promise<User> {
  const headers: HeadersInit | undefined = cookieHeader
    ? { Cookie: cookieHeader }
    : undefined;

  const response = await api(USER_ME_URL, {
    headers,
    credentials: cookieHeader ? "omit" : "include",
  });

  if (!response?.ok) {
    throw new Error(`getUser failed (${response?.status})`);
  }

  return response.json();
}
