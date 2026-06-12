import { env } from "@/env";

type ApiOptions = RequestInit & {
  headers?: HeadersInit & {
    Cookie?: string;
  };
};

export async function refreshAccessToken({
  cookieHeader,
}: {
  cookieHeader?: string;
}): Promise<void> {
  const res = await fetch(env.API_URL + "/api/auth/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    credentials: cookieHeader ? undefined : "include",
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }
}

export const api = async (
  url: string,
  options: ApiOptions = {},
): Promise<Response | null> => {
  let response = await fetch(url, options);

  if (response.status === 401) {
    try {
      const cookieHeader =
        typeof options.headers === "object" && "Cookie" in options.headers
          ? options.headers.Cookie
          : undefined;

      await refreshAccessToken({
        cookieHeader,
      });

      // Retry original request
      response = await fetch(url, options);
    } catch {
      console.log("Session expired...");
      return null;
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};
