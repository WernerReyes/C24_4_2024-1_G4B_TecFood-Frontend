import { useDispatch, useSelector } from "react-redux";
import type {
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  UploadImageDto,
} from "@/domain/dtos";
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
import type { DishFilters, DishModel } from "@/model";
import { DishService } from "@/infraestructure/services";
import { StorageKeys, getStorage, setStorage } from "../../utilities";
import { useMessageStore } from "../";

const { DISHES_TO_SEARCH, DISH_FILTERS } = StorageKeys;

const dishService = new DishService();
const dishRepositoryImpl = new DishRepositoryImpl(dishService);

export const useDishStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages, typeError, typeSuccess } = useMessageStore();
  const {
    dishes,
    dishesToSearch,
    dishesWithoutSelectedDish,
    dish,
    total,
    isLoading,
    filters,
  } = useSelector((state: AppState) => state.dish);

  const startCreateDish = async (
    createDishDto: CreateDishDto,
    uploadImageDto: [UploadImageDto?, string[]?],
  ) => {
    const [uploadImageDtoValidated, errors] = uploadImageDto;
    if (errors) {
      startSetMessages(errors, typeError);
      throw new Error("Error uploading image");
    }

    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .create(createDishDto, uploadImageDtoValidated!)
      .then(({ dish, message }) => {
        dispatch(onLoadDish(dish));
        startSetMessages([message], typeSuccess);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishes = async (
    getDishesDto: [GetDishesDto?, string[]?],
  ) => {
    const [validatedGetDishesDto, errors] = getDishesDto;
    if (errors) return startSetMessages(errors, typeError);
    dispatch(onLoadingDish());
    dishRepositoryImpl
      .getAll(validatedGetDishesDto!)
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

    if (getStorage(DISHES_TO_SEARCH)) {
      return dispatch(
        onLoadDishesToSearch(getStorage<DishModel[]>(DISHES_TO_SEARCH)!),
      );
    }
    dishRepositoryImpl
      .getAllToSearch()
      .then((data) => {
        dispatch(onLoadDishesToSearch(data.dishes));
        setStorage(DISHES_TO_SEARCH, data.dishes);
      })
      .catch(console.error);
  };

  const startLoadingDishesWithoutSelectedDish = async (
    dto: [GetDishesWithoutSelectedDishDto?, string[]?],
  ) => {
    dispatch(onLoadingDish());
    const [validatedDto, errors] = dto;
    if (errors) return startSetMessages(errors, typeError);
    dishRepositoryImpl
      .getAllWithoutSelectedDish(validatedDto!)
      .then((data) => {
        dispatch(onLoadDishesWithoutSelectedDish(data.dishes));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishById = async (id: number) => {
    dispatch(onLoadingDish());
    dishRepositoryImpl
      .getById(id)
      .then(({ dish }) => dispatch(onLoadDish(dish)))
      .catch(console.error);
  };

  const startFilterDishes = async (filters: DishFilters) => {
    dispatch(onLoadingDish());
    dispatch(onSetDishFilters(filters));
    setStorage(DISH_FILTERS, filters);
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
    startCreateDish,
    startLoadingDishes,
    startFilterDishes,
    startLoadingDishById,
    startLoadingDishesToSearch,
    startLoadingDishesWithoutSelectedDish,
  };
};
