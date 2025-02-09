import React, { useState, useEffect } from "react";
import { fetchCourseList } from "../../features/courseSlice";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import CourseItem from "./CourseItem";

const CourseList = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  let [qs, setQs] = useSearchParams();
  const [cat, setCat] = useState(
    qs.get("category") ? qs.get("category") : "none"
  );
  const { courseList } = useSelector((state) => state.course);

  const courseCategories = [
    { title: "Technology and IT", short: "tech_it" },
    { title: "Professional Development", short: "prof_dev" },
    { title: "Creative Arts", short: "creative_arts" },
    { title: "Health and Wellness", short: "health_wellness" },
    { title: "Language Learning", short: "language" },
    { title: "Vocational and Trade Skills", short: "vocational_trade" },
    { title: "Environmental Studies", short: "environmental_studies" },
    { title: "Social Sciences", short: "social_sciences" },
    { title: "Law and Legal Studies", short: "law_studies" },
  ];

  // const [itemOffset, setItemOffset] = useState(0);

  // const endOffset = itemOffset + 1;

  const handlePageClick = (event) => {
    const temp = Object.fromEntries(qs);
    setQs({ ...temp, page: event.selected + 1 });

    // const newOffset = (event.selected * 1) % 2;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // setItemOffset(newOffset);
  };

  useEffect(() => {
    const qs2 = Object.fromEntries(qs.entries());

    dispatch(fetchCourseList(qs2));
  }, [qs]);

  return (
    <div className="md:p-4 flex flex-col gap-2">
      <div className="mb-4">
        <h2 className="text-2xl font-medium mb-2">Online Courses</h2>
        <div>
          {/* Search: {"  "} */}

          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();

              const temp = Object.fromEntries(qs);

              delete temp.page;

              setQs({ ...temp, search: search });
              // dispatch(fetchCourseList({ search: search }));
            }}
          >
            <div className="w-full flex justify-end items-center relative">
              <input
                placeholder="Search"
                className="border border-gray-400 rounded-lg p-4 pl-12 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass absolute left-0 ml-4 w-10"></i>
              <input
                type="submit"
                className="w-fit text-sm rounded-r-lg absolute right-0 bg-primary-main h-full text-white px-4 cursor-pointer hover:bg-primary-main/80"
                value="Search"
              />
            </div>
          </form>
        </div>
      </div>

      <div>
        Filter: {"  "}
        <select
          className="bg-zinc-100 text-md border border-zinc-200 p-2 rounded-xl mb-1"
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
            if (e.target.value !== "none") {
              setQs({ category: e.target.value });
            } else {
              setQs(qs.delete("category"));
            }
          }}
        >
          <option value={"none"}>All</option>
          {courseCategories.map((item, index) => (
            <option key={index} value={item.short}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <hr className="my-2" />

      <div className="grid grid-cols-5 gap-8">
        {!courseList.loading ? (
          courseList.courseList.results &&
          courseList.courseList.results.length > 0 ? (
            courseList.courseList.results.map((course, ind) => (
              <div key={ind} className="col-span-5 md:col-span-1">
                <CourseItem course={course} />
              </div>
            ))
          ) : (
            "Empty"
          )
        ) : (
          <div className="animate-pulse w-full">
            <div className="w-full h-28 bg-zinc-100 rounded-sm "></div>
          </div>
        )}
      </div>

      {courseList.courseList.results &&
        courseList.courseList.results.length > 0 && (
          <ReactPaginate
            forcePage={qs.get("page") ? parseInt(qs.get("page")) - 1 : 0}
            containerClassName="w-full block space-x-4"
            nextClassName="inline-block after:block after:h-[2px] after:bg-primary-main text-sm"
            previousClassName="inline-block after:block after:h-[2px] after:bg-primary-main text-sm"
            activeClassName="bg-primary-main text-white"
            pageLinkClassName="block h-7 w-7 leading-7 align-middle text-center"
            pageClassName={"inline-block rounded-full cursor-pointer "}
            disabledClassName="text-zinc-400 after:block after:h-[2px] after:bg-zinc-400"
            breakLabel="..."
            breakClassName="inline-block"
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(courseList.courseList.count / 5)}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
          />
        )}
    </div>
  );
};

export default CourseList;
