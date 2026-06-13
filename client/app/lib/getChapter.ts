import { api } from "./api";
import { env } from "@/env";
import type { Chapter } from "@/types/course";

type GetChapterPayload = {
  courseSlug: string;
  chapterSlug: string;
};

const getChapter = async (
  { courseSlug, chapterSlug }: GetChapterPayload,
  cookieHeader?: string | null,
): Promise<Chapter> => {
  const res = await api(
    `${env.API_URL}/api/course/takechapter/${courseSlug}/chapter/${chapterSlug}/`,
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
