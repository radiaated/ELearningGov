"use client";

import { Chapter } from "@/types/course";
import formatDuration from "@/utils/formatDuration";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Link from "next/link";

const ChapterList = ({
  chapters,
  showWatchButton,
  courseSlug,
}: {
  chapters: Chapter[];
  showWatchButton?: boolean;
  courseSlug?: string;
}) => {
  return (
    <div className="">
      <h3 className="text-xl font-medium my-4">Contents:</h3>
      <Accordion allowMultipleExpanded={false}>
        {chapters.map((chapter: Chapter, idx: number) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton className="bg-zinc-50 border border-zinc-200 rounded-t-md py-4 px-3">
                <div className="font-medium text-xl flex justify-between">
                  <div>
                    <div className="mb-1">
                      {chapter.chpt}. {chapter.title}
                    </div>
                    <div className="align-middle text-xs text-zinc-400">
                      <i className="fa-regular fa-clock mr-2"></i>
                      <span className="">
                        {formatDuration(chapter.duration)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <i className="fa-solid fa-grip text-zinc-400 hover:text-zinc-500 active:scale-125"></i>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="bg-white border-b border-x border-zinc-200 p-4 pl-6">
              <p>{chapter.description}</p>
              {showWatchButton && (
                <Link
                  href={`/classroom/courses/${courseSlug}/chapter/${chapter.slug}`}
                  className="block align-middle  text-white bg-orange-500 px-4 py-2 w-fit rounded-sm absolute hover:border-b-4 hover:border-orange-600 bottom-5 right-4"
                >
                  Take <i className="fa-solid fa-arrow-right"></i>
                </Link>
              )}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ChapterList;
