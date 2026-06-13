"use client";

import StarRating from "@/app/components/StarRating";
import courseCategories from "@/data/courseCategories";
import { useCartStore } from "@/store/cartStore";
import buyCourse from "@/app/lib/buyCourse";
import formatPrice from "@/utils/formatPrice";

const CartPage = () => {
  const { items: cartItems, removeItem, clearCart } = useCartStore();

  const totalPrice = cartItems.reduce((t, i) => t + i.price, 0);
  const courseIds = cartItems.map((i) => i.id);

  const handleCheckout = async () => {
    try {
      const data = await buyCourse({
        course_id: courseIds,
        price: totalPrice,
      });

      if (data?.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
    <section>
      <div className="section-container my-8">
        <h2 className="title">Cart</h2>
        <hr className="my-4 text-zinc-300" />

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT: ITEMS */}
          <div className="md:col-span-2 divide-y divide-zinc-200">
            {cartItems.length === 0 && (
              <p className="text-zinc-500">Your cart is empty</p>
            )}

            {cartItems.map((item) => {
              return (
                <div key={item.id} className="flex items-start gap-4 py-5">
                  {/* IMAGE */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-18 rounded-md object-cover"
                  />

                  {/* CONTENT */}
                  <div className="flex-1">
                    <h3 className="text-zinc-700">{item.title}</h3>

                    <div className="mt-3 text-2xl font-bold">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT: SUMMARY */}
          {cartItems.length > 0 && (
            <div className="md:col-span-1 h-fit border border-zinc-200 rounded-lg p-5">
              <h3 className="text-lg font-medium mb-3">Summary</h3>

              <div className="flex justify-between text-2xl font-semibold mb-5">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              {/* CHECKOUT */}
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
              >
                Checkout
              </button>

              {/* CLEAR CART */}
              <button
                onClick={() => {
                  if (confirm("Clear cart?")) clearCart();
                }}
                className="w-full mt-3 border border-red-500 text-red-500 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPage;
