import { api } from "./api";
import { env } from "@/env";
import { Course } from "@/types/course";

const getCourse = async (slug: string): Promise<Course> => {
  const res = await api(`${env.API_URL}/api/course/${slug}/`);
  const data = await res?.json();

  return data;
};

export default getCourse;
