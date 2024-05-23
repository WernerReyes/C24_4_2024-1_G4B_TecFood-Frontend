import { useDispatch, useSelector } from "react-redux";
import { GetDishes } from "@/domain/use-cases";
import { DishRepositoryImpl } from "@/infraestructure/repositories";
import { DishService } from "../../infraestructure/services";
import {
  AppState,
  TypeMessage,
  onLoadDishes,
  onLoadingDish,
} from "@/infraestructure/store";
import type { GetDishesDto } from "@/domain/dtos";
import { useMessage } from "./useMessage";

const dishService = new DishService();
const dishRepositoryImpl = new DishRepositoryImpl(dishService);

export const useDishStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessage();

  const { dishes, isLoading } = useSelector((state: AppState) => state.dish);

  const startLoadingDishes = async (
    getDishesDto: [GetDishesDto?, string[]?],
  ) => {
    const [validatedGetDishesDto, errors] = getDishesDto;
    if (errors) return startSetMessages(errors, TypeMessage.ERROR);

    dispatch(onLoadingDish());
    await new GetDishes(dishRepositoryImpl)
      .execute(validatedGetDishesDto!)
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
