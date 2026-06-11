export async function refreshAccessToken() {
  const res = await fetch("/api/auth/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Refresh failed");
  const data = await res.json();
  localStorage.setItem("accessToken", data.access);
  return data.access;
}

export const api = async (
  url: string,
  options: object = {},
): Promise<Response | null> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 401) {
      try {
        await refreshAccessToken();
      } catch (err) {
        console.log("Session expired, logging out...");
        // window.location.href = "/login";
        return null;
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
};
