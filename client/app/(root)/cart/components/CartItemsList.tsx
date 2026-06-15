import type { Course } from "@/types/course";

import formatPrice from "@/utils/formatPrice";

interface Props {
  cartItems: Course[];
  removeItem: (id: number) => void;
}

const CartItemsList = ({ cartItems, removeItem }: Props) => {
  return (
    <div className="md:col-span-2 divide-y divide-zinc-200">
      {cartItems.length === 0 && (
        <p className="text-zinc-500">Your cart is empty</p>
      )}

      {cartItems.map((item) => {
        return (
          <div key={item.id} className="flex items-start gap-4 py-5">
            {/* Image */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-24 h-18 rounded-md object-cover"
            />

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-zinc-700">{item.title}</h3>

              <div className="mt-3 text-2xl font-bold">
                {formatPrice(item.price)}
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.id)}
              className="btn text-red-500 hover:text-red-700"
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CartItemsList;
