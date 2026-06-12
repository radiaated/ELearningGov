import { api } from "./api";
import { env } from "@/env";
import { Course } from "@/types/course";

const getCourses = async (
  searchParams: string,
): Promise<{ count: number; results: Course[] }> => {
  const query = searchParams ? `?${searchParams}` : "";

  const res = await api(`${env.API_URL}/api/course/${query}`);
  const data = await res?.json();

  return data;
};

export default getCourses;
