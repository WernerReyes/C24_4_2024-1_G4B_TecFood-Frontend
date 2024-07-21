import { useDispatch, useSelector } from "react-redux";
import type {
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  UpdateDishDto,
  UpdateDishImageDto,
  UploadImageDto,
} from "@/domain/dtos";
import { DishRepositoryImpl } from "@/infraestructure/repositories";
import {
  type AppState,
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
  const { startSetMessages, typeSuccess } = useMessageStore();
  const {
    dishes,
    dishesToSearch,
    dishesWithoutSelectedDish,
    dish,
    total,
    isLoading,
    filters,
  } = useSelector((state: AppState) => state.dish);

  const startCreatingDish = async (
    createDishDto: CreateDishDto,
    uploadImageDto: UploadImageDto,
  ) => {
    uploadImageDto.validate();

    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .create(createDishDto, uploadImageDto)
      .then(({ dish, message }) => {
        startSetMessages([message], typeSuccess);

        // Add new dish to dishes to search
        const newDishesToSearch = [dish, ...dishesToSearch];
        dispatch(onLoadDishesToSearch(newDishesToSearch));
        setStorage(DISHES_TO_SEARCH, newDishesToSearch);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUpdatingDish = async (updateDishDto: UpdateDishDto) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .update(updateDishDto)
      .then(({ dish, message }) => {
        dispatch(onLoadDish(dish));
        startSetMessages([message], typeSuccess);

        // Update dishes to search
        const newDishesToSearch = dishesToSearch.map((d) =>
          d.id === dish.id ? dish : d,
        );
        dispatch(onLoadDishesToSearch(newDishesToSearch));
        setStorage(DISHES_TO_SEARCH, newDishesToSearch);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUpdatingDishImage = async (updateImageDto: UpdateDishImageDto) => {
    updateImageDto.validate();

    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .updateImage(updateImageDto)
      .then(({ message, dishImages }) => {
        dispatch(onLoadDish({ ...dish, images: dishImages }));
        startSetMessages([message], typeSuccess);

        // Update dishes to search
        const newDishesToSearch = dishesToSearch.map((dish) => {
          if (dish.id === updateImageDto.dishId) {
            return { ...dish, images: dishImages };
          }
          return dish;
        });
        dispatch(onLoadDishesToSearch(newDishesToSearch));
        setStorage(DISHES_TO_SEARCH, newDishesToSearch);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startDeletingDish = async (id: number) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .delete(id)
      .then(({ message }) => {
        startSetMessages([message], typeSuccess);

        // Update dishes to search
        const newDishesToSearch = dishesToSearch.filter(
          (dish) => dish.id !== id,
        );
        dispatch(onLoadDishesToSearch(newDishesToSearch));
        setStorage(DISHES_TO_SEARCH, newDishesToSearch);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startDeletingManyDishes = async (ids: number[]) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .deleteMany(ids)
      .then(({ message }) => {
        startSetMessages([message], typeSuccess);

        // Update dishes to search
        const newDishesToSearch = dishesToSearch.filter(
          (dish) => !ids.includes(dish.id),
        );
        dispatch(onLoadDishesToSearch(newDishesToSearch));
        setStorage(DISHES_TO_SEARCH, newDishesToSearch);
      })
      .catch((error) => {
        throw error;
      });
  };
  const startLoadingDishes = async (getDishesDto: GetDishesDto) => {
    getDishesDto.validate();

    dispatch(onLoadingDish());
    dishRepositoryImpl
      .getAll(getDishesDto)
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
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ) => {
    getDishesWithoutSelectedDishDto.validate();

    dispatch(onLoadingDish());
    dishRepositoryImpl
      .getAllWithoutSelectedDish(getDishesWithoutSelectedDishDto)
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
    startCreatingDish,
    startUpdatingDish,
    startUpdatingDishImage,
    startDeletingDish,
    startDeletingManyDishes,
    startLoadingDishes,
    startFilterDishes,
    startLoadingDishById,
    startLoadingDishesToSearch,
    startLoadingDishesWithoutSelectedDish,
  };
};
