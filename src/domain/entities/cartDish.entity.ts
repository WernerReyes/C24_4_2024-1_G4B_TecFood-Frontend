import type { DishEntity } from "./dish.entity";
import type { UserEntity } from "./user.entity";

export interface CartDishEntity {
  idCart: number;
  quantity: number;
  dish: DishEntity;
  user: UserEntity;
}
