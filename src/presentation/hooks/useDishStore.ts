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
import { usePaginatorStore } from "./usePaginatorStore";

const dishService = new DishService();
const dishRepositoryImpl = new DishRepositoryImpl(dishService);

export const useDishStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessage();
  const { startChangePaginator } = usePaginatorStore();

  const { dishes, isLoading } = useSelector((state: AppState) => state.dish);

  const startLoadingDishes = async (
    getDishesDto: [GetDishesDto?, string[]?],
  ) => {
    const [validatedGetDishesDto, errors] = getDishesDto;
    if (errors) return startSetMessages(errors, TypeMessage.ERROR);

    dispatch(onLoadingDish());
    await new GetDishes(dishRepositoryImpl)
      .execute(validatedGetDishesDto!)
      .then((data) => {
        dispatch(onLoadDishes(data.dishes));
        console.log(data);
        startChangePaginator({
          currentPage: data.currentPage,
          limit: data.limit,
          total: data.total,
          next: data.next,
          previous: data.previous,
        });
      })
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
