import { api } from "./api";
import { env } from "@/env";
import { Course } from "@/types/course";

type GetCoursesPayload = {
  searchParams?: string | null;
};

const getCourses = async (
  payload: GetCoursesPayload,
): Promise<{ count: number; results: Course[] }> => {
  const query = payload.searchParams ? `?${payload.searchParams}` : "";

  const res = await api(`${env.API_URL}/api/course/${query}`);
  const data = await res?.json();

  return data;
};

export default getCourses;
