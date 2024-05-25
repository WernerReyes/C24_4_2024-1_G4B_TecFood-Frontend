import type { AuthSliceState } from "./slice/auth.slice";
import type { CartSliceState } from "./slice/cart.slice";
import type { DishOfferSliceState } from "./slice/dis-offer.slice";
import type { DishCategorySliceState } from "./slice/dish-category.slice";
import type { DishSliceState } from "./slice/dish.slice";
import type { MessageSliceState } from "./slice/message.slice";
import type { PaginatorSliceState } from "./slice/paginator.slice";
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
  cart: CartSliceState;
  paginator: PaginatorSliceState;
}
