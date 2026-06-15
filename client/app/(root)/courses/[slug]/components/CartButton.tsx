"use client";

import { useCartStore } from "@/store/cartStore";

const CartButton = ({
  course,
  purchased,
}: {
  course: any;
  purchased: boolean;
}) => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const inCart = items.some((item) => item.slug === course.slug);

  if (purchased) return null;

  return (
    <button
      className="btn block w-fit mx-auto text-center px-5 py-4 text-sm font-medium"
      onClick={() => {
        if (inCart) {
          removeItem(course.id);
        } else {
          addItem(course);
        }
      }}
    >
      {inCart ? (
        <span className="text-red-600 hover:text-red-700">
          Remove from cart <i className="fa-solid fa-trash"></i>
        </span>
      ) : (
        <span className="hover:text-primary-dark">
          Add to cart <i className="fa-solid fa-cart-plus"></i>
        </span>
      )}
    </button>
  );
};

export default CartButton;
