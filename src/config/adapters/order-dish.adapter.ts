import { OrderDishEntity } from "@/domain/entities";
import { userAdapter } from "./user.adapter";
import { OrderDishModel } from "@/model";

export const orderDishAdapter = (
  orderDishEntity: OrderDishEntity,
): OrderDishModel => {
  return {
    id: orderDishEntity.id,
    date: orderDishEntity.orderDate,
    status: orderDishEntity.status,
    total: orderDishEntity.total,
    user: userAdapter(orderDishEntity.user),
  };
};
