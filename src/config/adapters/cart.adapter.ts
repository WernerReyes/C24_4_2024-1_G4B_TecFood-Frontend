import { CartDishEntity } from "@/domain/entities";
import { CartDishModel } from "@/model";
import { dishAdapter } from "./dish.adapter";
import { userAdapter } from "./user.adapter";

export const cartAdapter = (cart: CartDishEntity): CartDishModel => {
  return {
    id: cart.idCart,
    quantity: cart.quantity,
    dish: dishAdapter(cart.dish),
    user: userAdapter(cart.user),
  };
};
