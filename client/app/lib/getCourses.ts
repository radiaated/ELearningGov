import { api } from "./api";
import { env } from "@/env";
import { Course } from "@/types/course";

const getCourses = async (
  searchParams: string | null = null,
): Promise<{ count: number; results: Course[] }> => {
  const response = await api(
    env.API_URL + `/api/course/` + ("?" + searchParams || ""),
  );
  const data = await response?.json();

  return data;
};

export default getCourses;
