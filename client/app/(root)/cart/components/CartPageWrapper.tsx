"use client";

import { toast } from "sonner";
import CartItemsList from "./CartItemsList";

import { useCartStore } from "@/store/cartStore";

import buyCourse from "@/app/lib/buyCourse";
import formatPrice from "@/utils/formatPrice";

const CartPageWrapper = () => {
  const { items: cartItems, removeItem, clearCart } = useCartStore();

  const totalPrice = cartItems.reduce((t, i) => t + i.price, 0);
  const courseIds = cartItems.map((i) => i.id);

  const handleCheckout = async () => {
    try {
      const data = await buyCourse({
        course_id: courseIds,
        price: totalPrice,
      });

      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (err) {
      toast.error("Checkout failed.");
      console.error(err);
    }
  };

  return (
    <section>
      <div className="section-container my-8">
        <h2 className="title">Cart</h2>
        <hr className="my-4 text-zinc-300" />

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <CartItemsList cartItems={cartItems} removeItem={removeItem} />

          {/* Right: Summary */}
          {cartItems.length > 0 && (
            <div className="md:col-span-1 h-fit border border-zinc-200 rounded-lg p-5">
              <h3 className="text-lg font-medium mb-3">Summary</h3>

              <div className="flex justify-between text-2xl font-semibold mb-5">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              {/* Checkout */}
              <button
                onClick={handleCheckout}
                className="btn w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700"
              >
                Checkout
              </button>

              {/* Clear cart */}
              <button
                onClick={() => {
                  if (confirm("Clear cart?")) clearCart();
                }}
                className="btn w-full mt-3 border border-red-500 text-red-500 py-2 rounded-full hover:bg-red-500 hover:text-white"
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

export default CartPageWrapper;
