import { CartEntity } from "@/domain/entities";
import { CartModel } from "@/model";
import { dishAdapter } from "./dish.adapter";
import { userAdapter } from "./user.adapter";

export const cartAdapter = (cart: CartEntity): CartModel => {
  return {
    id: cart.idCart,
    quantity: cart.quantity,
    dish: dishAdapter(cart.dish),
    user: userAdapter(cart.user),
  };
};
