import type { OrderDishItemEntity } from "@/domain/entities";
import type { OrderDishItemModel } from "@/model";
import { orderDishAdapter, dishAdapter } from ".";

export const orderDishItemAdapter = (
  orderDishItemEntity: OrderDishItemEntity,
): OrderDishItemModel => {
  return {
    id: orderDishItemEntity.id,
    quantity: orderDishItemEntity.quantity,
    price: orderDishItemEntity.price,
    orderDish: orderDishAdapter(orderDishItemEntity.orderDish),
    dish: dishAdapter(orderDishItemEntity.dish),
  };
};
