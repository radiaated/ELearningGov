import { api } from "./api";
import { env } from "@/env";
import { Chapter } from "@/types/course";

type GetChapterPayload = {
  course_slug: string;
  chapter_slug: string;
};

const getChapter = async (
  payload: GetChapterPayload,
  cookieHeader?: string | null,
): Promise<Chapter> => {
  const res = await api(
    `${env.API_URL}/api/course/takechapter/${payload.course_slug}/chapter/${payload.chapter_slug}/`,
    {
      headers: {
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: cookieHeader ? undefined : "include",
    },
  );

  return res?.json();
};

export default getChapter;
