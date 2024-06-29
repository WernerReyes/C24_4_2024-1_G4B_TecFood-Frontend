import type { AuthSliceState } from "./slice/auth.slice";
import type { CartDishSliceState } from "./slice/cart-dish.slice";
import type { DishOfferSliceState } from "./slice/dis-offer.slice";
import type { DishCategorySliceState } from "./slice/dish-category.slice";
import type { DishSliceState } from "./slice/dish.slice";
import type { MessageSliceState } from "./slice/message.slice";
import type { OpenIASliceState } from "./slice/open-ia.slice";
import type { OrderDishItemSliceState } from "./slice/order-dish-item.slice";
import type { OrderDishSliceState } from "./slice/order-dish.slice";
import type { PaymentSliceState } from "./slice/payment.slice";
import type { ThemeSliceState } from "./slice/theme.slice";
import type { UserSliceState } from "./slice/user.slice";

export interface AppState {
  themes: ThemeSliceState;
  message: MessageSliceState;
  user: UserSliceState;
  dishOffer: DishOfferSliceState;
  auth: AuthSliceState;
  dish: DishSliceState;
  dishCategory: DishCategorySliceState;
  cartDish: CartDishSliceState;
  orderDish: OrderDishSliceState;
  orderDishItem: OrderDishItemSliceState;
  payment: PaymentSliceState;
  openIA: OpenIASliceState;
}
