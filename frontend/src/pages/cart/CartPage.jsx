import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserContext from "../../context/UserContext";
import { appActions } from "../../features/appSlice";
import axios from "axios";

const SetStarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((item) => (
        <div className=" text-yellow-400">
          {item <= parseInt(rating) ? (
            <i className="fa-solid fa-star"></i>
          ) : (
            <i className="fa-regular fa-star"></i>
          )}
        </div>
      ))}
    </div>
  );
};

const CartPage = () => {
  const { cart } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const userCxt = useContext(UserContext);
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

  const buyCourse = async (payload) => {
    const { data } = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/user/profilecourses/`,
      data: payload,
      withCredentials: true,
    });

    window.location.href = data.payment_url;
  };

  return (
    <div className="w-full md:w-[80%] mx-auto mb-48">
      <h2 className="font-medium text-2xl">Cart</h2>
      <hr className="mt-4 mb-2" />
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-4 md:col-span-1 divide-y divide-zinc-200">
          {cart.length === 0 && "Empty"}
          {cart.map((item, ind) => (
            <div className="flex gap-4 col-span-3 py-4">
              <div className="">
                <img
                  src={`${import.meta.env.VITE_API_URL}${item.thumbnail}`}
                  alt=""
                  className="block w-fit h-24 object-cover rounded-md"
                />
              </div>

              <div>
                <h3>{item.title}</h3>
                <div className="space-y-1">
                  <div className="flex gap-1 text-sm items-baseline">
                    <span>{item.avg_rating}</span>
                    <SetStarRating rating={item.avg_rating} />
                    <span>({item.count_rating}) Reviews</span>
                  </div>
                  <div className="bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-1">
                    {item.category &&
                      courseCategories.find(
                        (cat) => cat.short === item.category
                      ).title}
                  </div>
                </div>
                <div className="text-center flex items-baseline">
                  <span className="text-sm">Rs.</span>{" "}
                  <span className="font-medim text-xl">{item.price / 100}</span>
                </div>
              </div>
              <div>
                <button onClick={() => dispatch(appActions.removeCart(ind))}>
                  <i className="fa-regular fa-circle-xmark text-red-500"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {localStorage.getItem("cart") && (
          <div className="col-span-4 md:col-span-1">
            <div className="pb-2 w-full">
              <span className="block text-xl">Total</span>
              <span className="block text-4xl">
                Rs.{" "}
                {cart.reduce((total, xx) => total + Number(xx.price), 0) / 100}
              </span>
            </div>
            <button
              className="group border border-green-600 rounded-full w-fit px-5 py-2 hover:bg-green-600 hover:text-zinc-100 duration-100"
              onClick={() => {
                const course_id = cart.map((c) => String(c.id));

                buyCourse({
                  course_id: course_id,
                  price: parseInt(
                    cart.reduce((total, xx) => total + Number(xx.price), 0)
                  ),
                  // price: 1000,
                });
              }}
            >
              Checkout <i className="fa-solid fa-cart-arrow-down"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
