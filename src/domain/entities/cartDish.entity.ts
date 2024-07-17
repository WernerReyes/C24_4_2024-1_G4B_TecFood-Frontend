import type { DishEntity } from "./dish.entity";
import type { UserEntity } from "./user.entity";

export interface CartDishEntity {
  id: number;
  quantity: number;
  dish: DishEntity;
  user: UserEntity;
}
