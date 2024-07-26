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
  onLoadDishesPaginated,
  onLoadDishes,
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
  const { startSetMessages } = useMessageStore();
  const {
    dishesPaginated,
    dishes,
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
      .then(({ data, message, status }) => {
        startSetMessages([message], status);

        // Add new dish to dishes to search
        const newDishesToSearch = [data, ...dishes];
        dispatch(onLoadDishes(newDishesToSearch));
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
      .then(({ data, message, status }) => {
        dispatch(onLoadDish(dish));
        startSetMessages([message], status);

        // Update dishes to search
        const newDishes = dishes.map((d) => (d.id === data.id ? data : d));
        dispatch(onLoadDishes(newDishes));
        setStorage(DISHES_TO_SEARCH, newDishes);
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
      .then(({ message, data, status }) => {
        dispatch(onLoadDish({ ...dish, images: data }));
        startSetMessages([message], status);

        // Update dishes to search
        const newDishes = dishes.map((dish) => {
          if (dish.id === updateImageDto.dishId) {
            return { ...dish, images: data };
          }
          return dish;
        });
        dispatch(onLoadDishes(newDishes));
        setStorage(DISHES_TO_SEARCH, newDishes);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startDeletingDish = async (id: number) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .delete(id)
      .then(({ message, status }) => {
        startSetMessages([message], status);

        // Update dishes to search
        const newDishes = dishes.filter((dish) => dish.id !== id);
        dispatch(onLoadDishes(newDishes));
        setStorage(DISHES_TO_SEARCH, newDishes);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startDeletingManyDishes = async (ids: number[]) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .deleteMany(ids)
      .then(({ message, status }) => {
        startSetMessages([message], status);

        // Update dishes to search
        const newDishes = dishes.filter((dish) => !ids.includes(dish.id));
        dispatch(onLoadDishes(newDishes));
        setStorage(DISHES_TO_SEARCH, newDishes);
      })
      .catch((error) => {
        throw error;
      });
  };
  const startLoadingDishesPaginated = async (getDishesDto: GetDishesDto) => {
    getDishesDto.validate();

    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .getAllPaginated(getDishesDto)
      .then(({ data }) => {
        dispatch(
          onLoadDishesPaginated({
            total: data.total,
            dishes: data.content,
          }),
        );
      })
      .catch(console.error);
  };

  const startLoadingDishes = async () => {
    dispatch(onLoadingDish());

    if (getStorage(DISHES_TO_SEARCH)) {
      return dispatch(onLoadDishes(getStorage<DishModel[]>(DISHES_TO_SEARCH)!));
    }
    await dishRepositoryImpl
      .getAll()
      .then(({ data }) => {
        dispatch(onLoadDishes(data));
        setStorage(DISHES_TO_SEARCH, data);
      })
      .catch(console.error);
  };

  const startLoadingDishesWithoutSelectedDish = async (
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ) => {
    getDishesWithoutSelectedDishDto.validate();

    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .getAllWithoutSelectedDish(getDishesWithoutSelectedDishDto)
      .then(({ data }) => {
        dispatch(onLoadDishesWithoutSelectedDish(data));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishById = async (id: number) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .getById(id)
      .then(({ data }) => dispatch(onLoadDish(data)))
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
    dishesPaginated,
    dishes,
    total,
    dishesWithoutSelectedDish,
    isLoading,
    filters,

    //* Methods
    startCreatingDish,
    startUpdatingDish,
    startUpdatingDishImage,
    startDeletingDish,
    startDeletingManyDishes,
    startLoadingDishesPaginated,
    startLoadingDishes,
    startFilterDishes,
    startLoadingDishById,
    startLoadingDishesWithoutSelectedDish,
  };
};
