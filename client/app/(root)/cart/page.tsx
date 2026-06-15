import type { Metadata } from "next";

import CartPageWrapper from "./components/CartPageWrapper";

export const metadata: Metadata = {
  title: "Cart | Dur-Sanchar Elearning",
  description: `View and manage your cart on Dur-Sanchar Elearning. Review selected courses, check total price, and proceed to secure checkout to complete your purchase.`,
};

const CartPage = () => {
  return <CartPageWrapper />;
};

export default CartPage;
