import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudyMaterial } from "../../features/studyMaterialsSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const StudyMaterial = () => {
  const userCxt = useContext(UserContext);
  const dispatch = useDispatch();
  const params = useParams();
  const { studyMaterial } = useSelector((state) => state.studyMaterials);

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

  const dwFile = async (slug) => {
    await axios({
      url: `${
        import.meta.env.VITE_API_URL
      }/api/base/download/studymaterial/?slug=${slug}`,
      method: "GET",
    }).then((res) => {
      window.open(
        `${import.meta.env.VITE_API_URL}/uploads/${res.data.file}`,
        "_blank"
      );
    });
  };

  useEffect(() => {
    dispatch(fetchStudyMaterial(params["smSlug"]));
  }, []);

  return (
    <div className="text-zinc-800">
      {!studyMaterial.loading ? (
        <>
          <div className="flex gap-16">
            <div className="flex flex-col gap-2 w-[60%]">
              <div className="bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-1">
                {studyMaterial.studyMaterial.category &&
                  courseCategories.find(
                    (cat) => cat.short === studyMaterial.studyMaterial.category
                  ).title}
              </div>
              <h3 className="text-2xl font-medium">
                {studyMaterial.studyMaterial.title}
              </h3>

              <div className="text-xs">
                by <i className="fa-regular fa-user"></i>{" "}
                <span className="text-primary-main">
                  {studyMaterial.studyMaterial.author}
                </span>
              </div>

              <p>{studyMaterial.studyMaterial.description}</p>

              {/* <div className="text-xl font-medium">
                  Rs. {studyMaterial.studyMaterial.price}
                </div> */}

              {/* <Link
                className="group border border-zinc-800 rounded-full w-fit px-5 py-2 hover:bg-zinc-600 hover:text-zinc-100 duration-100"
                to={`/buycourse?type=course&course=${course.course.slug}`}
              >
                Enroll{" "}
                <i className="fa-solid fa-graduation-cap group-hover:text-zinc-100"></i>
              </Link> */}
            </div>
            <div className="space-y-4 text-sm">
              <img
                src={
                  import.meta.env.VITE_API_URL +
                  studyMaterial.studyMaterial.thumbnail
                }
                className="h-64 block"
              />

              <div>
                <i className="fa-solid fa-globe"></i>{" "}
                {studyMaterial.studyMaterial.language}
              </div>
              <div>
                <i className="fa-solid fa-layer-group"></i>{" "}
                {studyMaterial.studyMaterial.level}
              </div>

              <div className="flex gap-1 items-center">
                <i className="fa-regular fa-clock"></i>
                Updated: {"  "}
                {new Date(
                  studyMaterial.studyMaterial.date_created
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <hr />
              <div>
                <button
                  className="group mt-4 cursor-pointer block border border-zinc-800 rounded-full w-fit px-5 py-2 hover:bg-zinc-600 hover:text-zinc-100 duration-100 mb-1"
                  onClick={() => {
                    dwFile(studyMaterial.studyMaterial.slug);
                  }}
                  // href={`${import.meta.env.VITE_API_URL}${
                  //   studyMaterial.studyMaterial.file
                  // }`}
                  // target="_blank"
                >
                  Download
                </button>
                <div>
                  <i className="fa-solid fa-download"></i>
                  {"  "}(
                  <span>
                    <span className="font-medium">
                      {studyMaterial.studyMaterial.dw_count}
                    </span>{" "}
                    downloads
                  </span>
                  )
                </div>
              </div>
            </div>
          </div>
          {/* <video
              src={import.meta.env.VITE_API_URL + course.course.preview_video}
            ></video> */}

          {/* <hr /> */}
          {/* <div className="divide-y divide-zinc-300">
            <h3 className="text-2xl font-semi-bold my-4">Contents:</h3>
            {course.course.syllabus &&
              course.course.syllabus.map((syl) => (
                <div key={syl.id} className="py-2 flex gap-4">
                  <div className="text-center">
                    <div className="text-xs">Chapter</div>
                    <div className="font-bold text-xl">{syl.chpt}</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{syl.title}</div>
                    <p>{syl.description}</p>
                    <div className="">
                      <i className="fa-regular fa-clock mr-2"></i>
                      {syl.duration < 60
                        ? "00"
                        : "0" + String(parseInt(syl.duration / 60))}
                      :
                      {syl.duration % 60 > 0 && syl.duration % 60 < 10
                        ? "0" + (syl.duration % 60)
                        : syl.duration % 60 >= 10 && syl.duration % 60 < 60
                        ? syl.duration % 60
                        : syl.duration % 60 > 60 && syl.duration % 60}
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div> */}
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default StudyMaterial;
