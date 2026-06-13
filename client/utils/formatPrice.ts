const formatPrice = (price: number): string => {
  return `Rs. ${price / 100}`;
};

export default formatPrice;
