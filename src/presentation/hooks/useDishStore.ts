import { useDispatch, useSelector } from "react-redux";
import { GetDishes, GetDishesToSearch } from "@/domain/use-cases";
import { DishRepositoryImpl } from "@/infraestructure/repositories";
import { DishService } from "../../infraestructure/services";
import {
  AppState,
  TypeMessage,
  onLoadDishes,
  onLoadingDish,
  onLoadDishesToSearch,
  onSetDishFilters,
} from "@/infraestructure/store";
import { GetDishesDto } from "@/domain/dtos";
import { useMessage } from "./useMessage";
import { usePaginatorStore } from "./usePaginatorStore";
import { getStorage, setStorage } from "../utilities";
import { DishFilters, DishState } from "@/model";

const dishService = new DishService();
const dishRepositoryImpl = new DishRepositoryImpl(dishService);

export const useDishStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessage();
  const { startChangePaginator } = usePaginatorStore();
  const { dishes, dishesToSearch, isLoading, filters } = useSelector(
    (state: AppState) => state.dish,
  );

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

  const startLoadingDishesToSearch = async () => {
    dispatch(onLoadingDish());

    if (getStorage("dishesToSearch")) {
      return dispatch(
        onLoadDishesToSearch(getStorage<DishState[]>("dishesToSearch")!),
      );
    }

    await new GetDishesToSearch(dishRepositoryImpl)
      .execute()
      .then((data) => {
        dispatch(onLoadDishesToSearch(data.dishes));
        setStorage("dishesToSearch", data.dishes);
      })
      .catch(console.error);
  };

  const startFilterDishes = async (filters: DishFilters) => {
    dispatch(onLoadingDish());
    dispatch(onSetDishFilters(filters));
    setStorage("dishFilters", filters);
  };

  return {
    //* Attributes
    dishes,
    dishesToSearch,
    isLoading,
    filters,

    //* Methods
    startLoadingDishes,
    startFilterDishes,
    startLoadingDishesToSearch,
  };
};
