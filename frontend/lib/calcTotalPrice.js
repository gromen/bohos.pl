export default function calcTotalPrice(cart) {
  return cart.reduce((prev, current) => {
    if (!current.product) return prev;
    return prev + current.quantity * current.product.price;
  }, 0);
}
