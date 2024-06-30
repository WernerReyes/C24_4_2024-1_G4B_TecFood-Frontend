import { GetDishesDto, GetDishesWithoutSelectedDishDto } from "@/domain/dtos";
import {
  GetDishById,
  GetDishes,
  GetDishesToSearch,
  GetDishesWithoutSelectedDish,
} from "@/domain/use-cases";
import { DishRepositoryImpl } from "@/infraestructure/repositories";
import {
  AppState,
  onLoadDish,
  onLoadDishes,
  onLoadDishesToSearch,
  onLoadDishesWithoutSelectedDish,
  onLoadingDish,
  onSetDishFilters,
} from "@/infraestructure/store";
import { DishFilters, DishState } from "@/model";
import { useDispatch, useSelector } from "react-redux";
import { DishService } from "@/infraestructure/services";
import { getStorage, setStorage } from "../../utilities";
import { useMessage } from "../";

const dishService = new DishService();
const dishRepositoryImpl = new DishRepositoryImpl(dishService);

export const useDishStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages, typeError } = useMessage();
  const { dishes, dishesToSearch, dishesWithoutSelectedDish, dish, total, isLoading, filters } =
    useSelector((state: AppState) => state.dish);

  const startLoadingDishes = async (
    getDishesDto: [GetDishesDto?, string[]?],
  ) => {
    const [validatedGetDishesDto, errors] = getDishesDto;
    if (errors) return startSetMessages(errors, typeError);
    dispatch(onLoadingDish());
    await new GetDishes(dishRepositoryImpl)
      .execute(validatedGetDishesDto!)
      .then((data) => {
        dispatch(
          onLoadDishes({
            total: data.total,
            dishes: data.dishes,
          }),
        );
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

  const startLoadingDishesWithoutSelectedDish = async (
    dto: [GetDishesWithoutSelectedDishDto?, string[]?],
  ) => {
    dispatch(onLoadingDish());
    const [validatedDto, errors] = dto;
    if (errors) return startSetMessages(errors, typeError);
    await new GetDishesWithoutSelectedDish(dishRepositoryImpl)
      .execute(validatedDto!)
      .then((data) => {
        dispatch(onLoadDishesWithoutSelectedDish(data.dishes));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishById = async (id: number) => {
    dispatch(onLoadingDish());

    await new GetDishById(dishRepositoryImpl)
      .execute(id)
      .then(({ dish }) => dispatch(onLoadDish(dish)))
      .catch(console.error);
  };

  const startFilterDishes = async (filters: DishFilters) => {
    dispatch(onLoadingDish());
    dispatch(onSetDishFilters(filters));
    setStorage("dishFilters", filters);
  };

  return {
    //* Attributes
    dish,
    dishes,
    total,
    dishesToSearch,
    dishesWithoutSelectedDish,
    isLoading,
    filters,

    //* Methods
    startLoadingDishes,
    startFilterDishes,
    startLoadingDishById,
    startLoadingDishesToSearch,
    startLoadingDishesWithoutSelectedDish,
  };
};
