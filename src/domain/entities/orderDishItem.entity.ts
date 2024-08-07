import type { DishEntity, OrderDishEntity } from ".";

export interface OrderDishItemEntity {
    id: number;
    quantity: number;
    price: number;
    orderDish: OrderDishEntity;
    dish: DishEntity;
}
