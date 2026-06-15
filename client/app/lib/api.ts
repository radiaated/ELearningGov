import { env } from "@/env";

export class HttpError extends Error {
  response: Response;

  constructor(response: Response, message?: string) {
    super(message ?? `HTTP Error ${response.status}`);
    this.name = "HttpError";
    this.response = response;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  get status(): number {
    return this.response.status;
  }
}
export class BadRequestError extends HttpError {
  constructor(response: Response) {
    super(response, "Bad Request");
    this.name = "BadRequestError";
  }
}
export class UnauthorizedError extends HttpError {
  constructor(response: Response) {
    super(response, "Unauthorized Error");
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends HttpError {
  constructor(response: Response) {
    super(response, "Not Found");
    this.name = "NotFoundError";
  }
}

export function createHttpError(response: Response): HttpError {
  switch (response.status) {
    case 400:
      return new BadRequestError(response);
    case 401:
      return new UnauthorizedError(response);
    case 404:
      return new NotFoundError(response);
    default:
      return new HttpError(response);
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
}): Promise<Response> {
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

  return res;
}

export const api = async (
  url: string,
  options: ApiOptions = {},
): Promise<Response | null> => {
  let response = await fetch(url, options);

  if (response.status === 401) {
    try {
      const cookieHeader =
        typeof options.headers === "object" &&
        options.headers &&
        "Cookie" in options.headers
          ? options.headers.Cookie
          : undefined;

      const res = await refreshAccessToken({
        cookieHeader,
      });

      if (res?.ok) {
        response = await fetch(url, options);
      }
    } catch (error) {
      console.log("Session expired:", error);
      return null;
    }
  }

  if (!response.ok) {
    throw createHttpError(response);
  }

  return response;
};
