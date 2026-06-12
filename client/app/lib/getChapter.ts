import { api } from "./api";
import { env } from "@/env";
import { Chapter } from "@/types/course";

const getChapter = async (
  courseSlug: string,
  chapterSlug: string,
): Promise<Chapter> => {
  const response = await api(
    env.API_URL +
      `/api/course/takechapter/${courseSlug}/chapter/${chapterSlug}/`,
  );
  const data = await response?.json();

  return data;
};

export default getChapter;
