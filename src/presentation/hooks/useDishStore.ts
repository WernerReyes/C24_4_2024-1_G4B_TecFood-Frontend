import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "@/domain/use-cases";
import { dishRepositoryImpl } from "@/infraestructure/repositories";
import { AppState, onLoadDishes, onLoadingDish } from "@/infraestructure/store";
import type { GetDishesDto } from "@/domain/dtos";

export const useDishStore = () => {
  const dispatch = useDispatch();

  const { dishes, isLoading } = useSelector((state: AppState) => state.dish);

  const startLoadingDishes = async (getDishesDto: GetDishesDto) => {
    dispatch(onLoadingDish());
    await getDishes(dishRepositoryImpl)
      .execute(getDishesDto)
      .then(({ dishes }) => dispatch(onLoadDishes(dishes)))
      .catch(console.error);
  };

  return {
    //* Attributes
    dishes,
    isLoading,

    //* Methods
    startLoadingDishes,
  };
};
