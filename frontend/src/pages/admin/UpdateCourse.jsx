import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCourse = () => {
  const schema = yup.object({
    title: yup.string().required("Requried"),
    author: yup.string().required("Requried"),
    language: yup.string().required("Requried"),
    level: yup.string().required("Requried"),
    description: yup.string().required("Requried"),
    requirements: yup.string(),
    category: yup.string().required("Requried"),
    thumbnail: yup
      .mixed()
      .notRequired()
      .test({
        name: "fileTypeTest",
        test: (file_list) => {
          console.log("file", file_list);
          const allowedMimeTypes = [
            "image/gif",
            "image/jpe",
            "image/jpg",
            "image/jpeg",
            "image/png",
          ];

          if (file_list instanceof FileList && file_list.length > 0) {
            return allowedMimeTypes.includes(file_list[0].type);
          }

          return true;
        },
        message: "Inappropriate image type. Allowed: .gif, .png, .jpg",
      }),

    preview_video: yup
      .mixed()
      .notRequired()
      .test({
        name: "fileTypeTest",
        test: (file_list) => {
          console.log("file", file_list);
          const allowedMimeTypes = ["video/x-matroska", "video/mp4"];
          if (file_list instanceof FileList && file_list.length > 0) {
            return allowedMimeTypes.includes(file_list[0].type);
          }

          return true;
        },
        message: "Inappropriate image type. Allowed: .mp4, .mkv",
      }),

    price: yup.string().required("Requried"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const param = useParams();

  const [chapters, setChapters] = useState([
    { title: "", description: "", video: "", duration: "" },
  ]);

  const onChangeChapter = (event, index) => {
    setChapters((state) => {
      let temp = [...state];

      temp[index][event.target.name] =
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value;
      console.log(temp);

      return temp;
    });
  };

  const fetchCourse = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/admins/courses/${
          param.slug
        }/`,
      });
      reset(data.course);
      setChapters(data.chapters);
    } catch {}
  };

  const onSubmit = async (payload) => {
    const fd = new FormData();

    fd.append("title", payload.title);
    fd.append("author", payload.author);
    fd.append("language", payload.language);
    fd.append("level", payload.level);
    fd.append("description", payload.description);
    fd.append("requirements", payload.requirements);
    fd.append("category", payload.category);

    fd.append("thumbnail", payload.thumbnail ? payload.thumbnail[0] : null);
    fd.append(
      "preview_video",
      payload.preview_video ? payload.preview_video[0] : null
    );
    fd.append("price", payload.price);

    fd.append("chapters", JSON.stringify(chapters));

    chapters.forEach((chapter, i) => {
      console.log(chapter.video);

      fd.append(`chpt_no${i + 1}`, chapter.video);
    });

    console.log(payload);

    // try {
    await axios({
      method: "PUT",
      url: `${import.meta.env.VITE_API_URL}/api/admins/courses/${param.slug}/`,
      data: fd,
      withCredentials: true,
    });
    navigate("/admin/courses");
    // } catch {}
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="w-[80%] mx-auto bg-white p-8 rounded-md border border-zinc-200 shadow-md">
      <h2 className="text-lg font-bold">Update course</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="sl-form">
        <div className="form-group">
          <label>
            Title<span className="text-red-600 italic">*</span>
          </label>
          <input type="text" {...register("title")} placeholder="Web Dev" />
          <span className="text-red-700 text-sm italic">
            {errors.title?.message}
          </span>
        </div>
        <div className="form-group">
          <label>
            Description<span className="text-red-600 italic">*</span>
          </label>
          <textarea
            rows={4}
            type="text"
            {...register("description")}
            placeholder="Write"
          />
          <span className="text-red-700 text-sm italic">
            {errors.description?.message}
          </span>
        </div>
        <div className="form-group">
          <label>
            Author<span className="text-red-600 italic">*</span>
          </label>
          <input type="text" {...register("author")} placeholder="John Doe" />
          <span className="text-red-700 text-sm italic">
            {errors.author?.message}
          </span>
        </div>
        <div className="form-group">
          <label>
            Language<span className="text-red-600 italic">*</span>
          </label>
          <input type="text" {...register("language")} placeholder="Englsih" />
          <span className="text-red-700 text-sm italic">
            {errors.language?.message}
          </span>
        </div>
        <div className="form-group">
          <label>
            Level<span className="text-red-600 italic">*</span>
          </label>
          <input
            type="text"
            {...register("level")}
            placeholder="Intermediate"
          />
          <span className="text-red-700 text-sm italic">
            {errors.level?.message}
          </span>
        </div>
        <div className="form-group">
          <label>Requirements</label>
          <input type="text" {...register("requirements")} placeholder="SEE" />
          <span className="text-red-700 text-sm italic">
            {errors.requirements?.message}
          </span>
        </div>
        <div className="form-group">
          <label>
            Category<span className="text-red-600 italic">*</span>
          </label>
          <input type="text" {...register("category")} placeholder="IT" />
          <span className="text-red-700 text-sm italic">
            {errors.category?.message}
          </span>
        </div>
        <div className="form-group">
          <label>
            Thumbnail<span className="text-red-600 italic">*</span>
          </label>
          <input type="file" {...register("thumbnail")} className="block" />
          <span className="text-red-700 text-sm italic">
            {errors.thumbnail?.message}
          </span>
        </div>
        <div className="form-group">
          <label>
            Preview<span className="text-red-600 italic">*</span>
          </label>
          <input type="file" {...register("preview_video")} className="block" />
          <span className="text-red-700 text-sm italic">
            {errors.preview_video?.message}
          </span>
        </div>
        <div className="form-group">
          <label>
            Price<span className="text-red-600 italic">*</span>
          </label>
          <input type="number" {...register("price")} placeholder="Title" />
          <span className="text-red-700 text-sm italic">
            {errors.price?.message}
          </span>
        </div>
        <div className="border border-zinc-200 p-4 rounded-sm space-y-3 divide-y">
          <div className="flex gap-1 items-center">
            <h5 className="text-xl font-medium">Chapters</h5>

            <button
              onClick={(event) => {
                console.log("pressed");

                event.preventDefault();
                setChapters((state) => {
                  let temp = [...state];
                  temp.push({
                    title: "",
                    description: "",
                    video: "",
                    duration: "",
                  });
                  console.log(temp);

                  return temp;
                });
              }}
              className="underline underline-offset-1 text-primary-dark"
            >
              Add +
            </button>
          </div>
          {chapters.map((chpt, i) => (
            <div key={i} className="grid grid-cols-12 items-center gap-4 pt-4">
              <div className="font-semibold">{i + 1}</div>
              <div className="col-span-5">
                <input
                  type="text"
                  name="title"
                  value={chpt.title}
                  onChange={(event) => onChangeChapter(event, i)}
                  placeholder="Title"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="file"
                  //   value={chpt.video}
                  name="video"
                  onChange={(event) => onChangeChapter(event, i)}
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  name="duration"
                  value={chpt.duration}
                  onChange={(event) => onChangeChapter(event, i)}
                  placeholder="Price"
                />
              </div>
              <div className="col-span-10">
                <textarea
                  rows={4}
                  type="text"
                  name="description"
                  value={chpt.description}
                  onChange={(event) => onChangeChapter(event, i)}
                  placeholder="Description"
                />
              </div>
              <div className="col-span-2">
                <button
                  onClick={() =>
                    setChapters((state) => {
                      let temp = [...state];
                      if (temp.length <= 1) {
                        temp = [
                          {
                            title: "",
                            description: "",
                            video: "",
                            duration: "",
                          },
                        ];
                      } else {
                        temp.splice(i, 1);
                      }

                      return temp;
                    })
                  }
                  className="bg-red-700 text-zinc-50 border border-red-600 px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="form-group">
          <input className="btn w-fit" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default UpdateCourse;
