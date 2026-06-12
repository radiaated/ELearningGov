import { api } from "./api";
import { env } from "@/env";
import { Course } from "@/types/course";

const getCourse = async (slug: string): Promise<Course> => {
  const response = await api(env.API_URL + `/api/course/${slug}/`);
  const data = await response?.json();

  return data;
};

export default getCourse;
