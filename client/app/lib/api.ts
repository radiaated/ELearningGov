import { env } from "@/env";

export class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

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
    console.log("Refresh failed");
  }
}

export const api = async (
  url: string,
  options: ApiOptions = {},
): Promise<Response | null> => {
  let response = await fetch(url, options);

  if (response.status === 404) {
    throw new NotFoundError();
  }

  if (response.status === 401) {
    try {
      const cookieHeader =
        typeof options.headers === "object" &&
        options.headers &&
        "Cookie" in options.headers
          ? options.headers.Cookie
          : undefined;

      await refreshAccessToken({
        cookieHeader,
      });

      response = await fetch(url, options);
    } catch (error) {
      console.log("Session expired:", error);
      return null;
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};
