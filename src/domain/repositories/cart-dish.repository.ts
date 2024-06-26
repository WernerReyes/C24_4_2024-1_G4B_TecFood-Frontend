import type {
  GetDishesByUserModel,
  AddOneDishModel,
  DeleteOneDishModel,
  DeleteAllDishesModel,
  GetDishByDishIdModel,
  GetTotalDishesByUserModel,
} from "@/model";

export interface CartDishRepository {
  addOneDish: (dishId: number) => Promise<AddOneDishModel>;
  getDishesByUser: () => Promise<GetDishesByUserModel>;
  deleteOneDish: (dishId: number) => Promise<DeleteOneDishModel>;
  deleteAllDishes: (cartId: number) => Promise<DeleteAllDishesModel>;
  getDishByDishId: (dishId: number) => Promise<GetDishByDishIdModel>;
  getTotalDishesByUser: () => Promise<GetTotalDishesByUserModel>;
}
