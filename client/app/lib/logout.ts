import { api } from "./api";
import { env } from "@/env";

const logout = async (): Promise<void> => {
  await api(env.API_URL + "/api/auth/logout/", {
    method: "POST",
    credentials: "include",
  });
};

export default logout;
