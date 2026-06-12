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
      className="block w-fit mx-auto text-center px-5 py-4"
      onClick={() => {
        if (inCart) {
          removeItem(course.slug);
        } else {
          addItem(course);
        }
      }}
    >
      {inCart ? (
        <>
          Remove from cart <i className="fa-solid fa-trash"></i>
        </>
      ) : (
        <>
          Add to cart <i className="fa-solid fa-cart-plus"></i>
        </>
      )}
    </button>
  );
};

export default CartButton;
