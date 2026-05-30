export type CartItem = {
  price: number;
  quantity: number;
};


export function calculateCartTotal(items: CartItem []): number {
  return items.reduce((total,item) => {
return total + (item.price * item.quantity)
  },0)
}