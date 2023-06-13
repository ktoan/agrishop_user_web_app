export const calculateListCartOrOrderPrice = list => {
  if (list.length === 0)
    return {subTotal: (0).toFixed(2), saleOff: (0).toFixed(2), total: (0).toFixed(2)};

  const subTotal = list
    .reduce((total, next) => total + next.product.price * next.quantity, 0)
    .toFixed(2);
  const saleOff = list
    .reduce(
      (total, next) => total + (next.product.price / 100) * next.product.saleOff * next.quantity,
      0
    )
    .toFixed(2);
  const total = list
    .reduce(
      (total, next) =>
        total +
        (next.product.price - (next.product.price / 100) * next.product.saleOff) * next.quantity,
      0
    )
    .toFixed(2);
  return {subTotal, saleOff, total};
};

export const calculateProductStar = product => {
  if (product.reviews.length === 0) return 0;
  let totalValue = product.reviews.reduce((total, review) => (total += review.value), 0);
  const value = (totalValue / product.reviews.length).toFixed(2);
  return Number(value);
};
