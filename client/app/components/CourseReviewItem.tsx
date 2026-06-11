import StarRating from "./StarRating";

import { CourseReview } from "@/types/course";

const CourseReviewItem = ({
  review,
  isOwner,
}: {
  review: CourseReview;
  isOwner: boolean;
}) => {
  //   const [revMenu, setRevMenu] = useState(false);
  //   const userCxt = useContext(UserContext);

  return (
    <>
      <div className="bg-zinc-50 p-4 border border-zinc-100 relative">
        {/* {
        userCxt.auth && userCxt.auth.username === rev.username && (
          <>
            <button
              onClick={() => {
                setRevMenu((state) => !state);
              }}
              className="absolute top-1 right-4 text-zinc-500 text-sm"
            >
              <i className="fa-solid fa-ellipsis"></i>
            </button>
            {revMenu && (
              <>
                <div
                  className="w-[100%] h-[100vh] fixed top-0 left-0  z-[60]"
                  onClick={() => {
                    setRevMenu(false);
                  }}
                ></div>
                <div className="bg-white border border-zinc-200 shadow-md rounded-md absolute right-2 w-fit top-6 text-zinc-700 text-sm  z-[65]">
                  <button
                    className="block py-2 px-4 text-red-700"
                    onClick={() => deleteReview(rev.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </>
        )} */}

        <div className="text-primary-main">{review.username}</div>
        <div className="flex justify-between text-xs">
          <div className="">
            <StarRating rating={review.rating} />
          </div>
          <div>
            {new Date(review.date_created).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <hr className="my-2" />

        <div className="text-[15px]">{review.comment}</div>
      </div>
    </>
  );
};
export default CourseReviewItem;
