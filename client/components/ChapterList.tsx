"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import type { Chapter } from "@/types/course";

import formatDuration from "@/utils/formatDuration";

interface ChapterListProps {
  chapters: Chapter[];
  showWatchButton?: boolean;
  courseSlug?: string;
}

const ChapterList = ({
  chapters,
  showWatchButton = false,
  courseSlug,
}: ChapterListProps) => {
  return (
    <section>
      <h3 className="text-xl font-medium my-4">Contents</h3>

      <Accordion allowMultipleExpanded={false} allowZeroExpanded>
        {chapters.map((chapter) => (
          <AccordionItem key={chapter.slug}>
            <AccordionItemHeading>
              <AccordionItemButton className="bg-zinc-50 border border-zinc-200 rounded-t-md py-4 px-3">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium text-xl">
                      {chapter.chpt}. {chapter.title}
                    </p>

                    <div className="flex items-center text-xs text-zinc-400 mt-1">
                      <i
                        className="fa-regular fa-clock mr-2"
                        aria-hidden="true"
                      />
                      <span>{formatDuration(chapter.duration)}</span>
                    </div>
                  </div>

                  <div aria-hidden="true">
                    <i className="fa-solid fa-grip text-zinc-400 hover:text-zinc-500 active:scale-125" />
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel className="relative bg-white border-b border-x border-zinc-200 p-4 pb-12 pl-6">
              <p className="text-sm text-zinc-700">{chapter.description}</p>

              {showWatchButton && courseSlug && (
                <Link
                  href={`/classroom/courses/${courseSlug}/chapter/${chapter.slug}`}
                  className="absolute right-2 bottom-2 inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-600 transition"
                >
                  Watch{" "}
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Link>
              )}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default ChapterList;
