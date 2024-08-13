import type { AuthSliceState } from "./slice/auth.slice";
import type { CartDishSliceState } from "./slice/cartDish.slice";
import type { DishCategorySliceState } from "./slice/dishCategory.slice";
import type { DishSliceState } from "./slice/dish.slice";
import type { MessageSliceState } from "./slice/message.slice";
import type { OpenAISliceState } from "./slice/openAI.slice";
import type { OrderDishItemSliceState } from "./slice/orderDishItem.slice";
import type { OrderDishSliceState } from "./slice/orderDish.slice";
import type { PaymentSliceState } from "./slice/payment.slice";
import type { ThemeSliceState } from "./slice/theme.slice";
import type { UserSliceState } from "./slice/user.slice";
import type { NotificationSliceState } from "./slice/notification.slice";

export interface AppState {
  theme: ThemeSliceState;
  message: MessageSliceState;
  user: UserSliceState;
  auth: AuthSliceState;
  dish: DishSliceState;
  dishCategory: DishCategorySliceState;
  cartDish: CartDishSliceState;
  orderDish: OrderDishSliceState;
  orderDishItem: OrderDishItemSliceState;
  payment: PaymentSliceState;
  openAI: OpenAISliceState;
  notification: NotificationSliceState;
}
