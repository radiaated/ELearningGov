"use client";

import StarRating from "@/app/components/StarRating";
import courseCategories from "@/data/courseCategories";
import { env } from "@/env";
import { api } from "@/app/lib/api";

import { useCartStore } from "@/store/cartStore";

import type { Course } from "@/types/course";

import buyCourse from "@/app/lib/buyCourse";
import formatPrice from "@/utils/formatPrice";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="w-full md:w-[80%] mx-auto mb-48">
      <h2 className="font-medium text-2xl">Cart</h2>
      <hr className="mt-4 mb-2" />
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-4 md:col-span-1 divide-y divide-zinc-200">
          {cartItems.length === 0 && "Empty"}
          {cartItems.map((item, ind) => (
            <div className="flex gap-4 col-span-3 py-4">
              <div className="">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="block w-fit h-24 object-cover rounded-md"
                />
              </div>

              <div>
                <h3>{item.title}</h3>
                <div className="space-y-1">
                  <div className="flex gap-1 text-sm items-baseline">
                    <span>{item.avg_rating}</span>
                    <StarRating rating={item.avg_rating} />
                    <span>({item.reviews_count}) Reviews</span>
                  </div>
                  <div className="bg-zinc-100 border border-zinc-300/25 text-xs w-fit px-1">
                    {
                      courseCategories.find(
                        (cat) => cat.value === item.category,
                      )?.label
                    }
                  </div>
                </div>
                <div className="text-center flex items-baseline">
                  <span className="font-medim text-xl">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
              <div>
                <button onClick={() => removeItem(item.id)}>
                  <i className="fa-regular fa-circle-xmark text-red-500"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="col-span-4 md:col-span-1">
            <div className="pb-2 w-full">
              <span className="block text-xl">Total</span>
              <span className="block text-4xl">
                {formatPrice(
                  cartItems.reduce(
                    (total: number, cartItem) => total + cartItem.price,
                    0,
                  ),
                )}
              </span>
            </div>
            <button
              className="group border border-green-600 rounded-full w-fit px-5 py-2 hover:bg-green-600 hover:text-zinc-100 duration-100"
              onClick={() => {
                const course_id = cartItems.map((c) => c.id);

                buyCourse({
                  course_id: course_id,
                  price: cartItems.reduce((total, xx) => total + xx.price, 0),
                }).then((data) => (window.location.href = data.payment_url));
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
