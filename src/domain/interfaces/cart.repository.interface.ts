import type {
  GetDishesByUserModel,
  AddOneDishModel,
  DeleteOneDishModel,
  DeleteAllDishesModel,
} from "@/model";

export interface CartRepository {
  addOneDish: (dishId: number) => Promise<AddOneDishModel>;
  getDishesByUser: () => Promise<GetDishesByUserModel>;
  deleteOneDish: (dishId: number) => Promise<DeleteOneDishModel>;
  deleteAllDishes: (cartId: number) => Promise<DeleteAllDishesModel>;
}
