import { useDispatch, useSelector } from "react-redux";
import type {
  CreateDishRequest,
  GetDishesRequest,
  GetDishesWithoutSelectedDishRequest,
  UpdateDishRequest,
  UpdateDishImageRequest,
  UploadImageRequest,
  UpdateStatusRequest,
  PutDishOfferRequest,
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
  onFinishedLoadingDish,
} from "@/infraestructure/store";
import { dishEmptyState, type DishFilters, type DishModel } from "@/model";
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
    createDishRequest: CreateDishRequest,
    uploadImageRequest: UploadImageRequest,
  ) => {
    uploadImageRequest.validate();

    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .create(createDishRequest, uploadImageRequest)
      .then(({ data, message, status }) => {
        startSetMessages([message], status);

        // Add new dish to dishes to search
        const newDishesToSearch = [data, ...dishes];
        dispatch(onLoadDishes(newDishesToSearch));
        setStorage(DISHES_TO_SEARCH, newDishesToSearch);
      })
      .catch((error) => {
        dispatch(onFinishedLoadingDish());
        throw error;
      });
  };

  const startPuttingDishOffer = async (
    putDishOfferRequest: PutDishOfferRequest,
  ) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .putOffer(putDishOfferRequest)
      .then(({ data, message, status }) => {
        // dispatch(onLoadDish(data));
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

  const startDeletingDishOffer = async (dishId: number) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .deleteOffer(dishId)
      .then(({ data, message, status }) => {
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

  const startDeletingManyDishOffers = async (dishIds: number[]) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .deleteManyOffers(dishIds)
      .then(({ data, message, status }) => {
        startSetMessages([message], status);

        const dishMap = new Map(data.map((dish) => [dish.id, dish]));
        const newDishes = dishes.map((d) => dishMap.get(d.id) ?? d);
        // Update dishes to search
        dispatch(onLoadDishes(newDishes));
        setStorage(DISHES_TO_SEARCH, newDishes);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUpdatingDish = async (updateDishRequest: UpdateDishRequest) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .update(updateDishRequest)
      .then(({ data, message, status }) => {
        dispatch(onLoadDish(data));
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

  const startUpdatingDishImage = async (
    updateImageDto: UpdateDishImageRequest,
  ) => {
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

  const startUpdatingDishStatus = async (
    updateStatusRequest: UpdateStatusRequest,
  ) => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .updateStatus(updateStatusRequest)
      .then(({ data }) => {
        dispatch(onLoadDish(data));

        // Update dishes to search
        const newDishes = dishes.map((d) => (d.id === data.id ? data : d));
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
        dispatch(onFinishedLoadingDish());
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
        dispatch(onFinishedLoadingDish());
        throw error;
      });
  };
  const startLoadingDishesPaginated = async (
    getDishesRequest: GetDishesRequest,
  ) => {
    getDishesRequest.validate();

    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .getAllPaginated(getDishesRequest)
      .then(({ data }) => {
        dispatch(
          onLoadDishesPaginated({
            total: data.total,
            dishes: data.content,
          }),
        );
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishes = async () => {
    dispatch(onLoadingDish());

    if (getStorage(DISHES_TO_SEARCH)) {
      return dispatch(
        onLoadDishes(
          getStorage<DishModel[]>(DISHES_TO_SEARCH)!.map((dish) => ({
            ...dish,
            saleStartDate: new Date(dish.saleStartDate),
            saleEndDate: new Date(dish.saleEndDate),
          })),
        ),
      );
    }
    await dishRepositoryImpl
      .getAll()
      .then(({ data }) => {
        dispatch(onLoadDishes(data));
        setStorage(DISHES_TO_SEARCH, data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishesPublished = async () => {
    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .getAllPublished()
      .then(({ data }) => {
        dispatch(onLoadDishes(data));
        setStorage(DISHES_TO_SEARCH, data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishesWithoutSelectedDish = async (
    getDishesWithoutSelectedDishRequest: GetDishesWithoutSelectedDishRequest,
  ) => {
    getDishesWithoutSelectedDishRequest.validate();

    dispatch(onLoadingDish());
    await dishRepositoryImpl
      .getAllWithoutSelectedDish(getDishesWithoutSelectedDishRequest)
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
      .catch((error) => {
        throw error;
      });
  };

  const startFilterDishes = async (filters: DishFilters) => {
    dispatch(onLoadingDish());
    dispatch(onSetDishFilters(filters));
    setStorage(DISH_FILTERS, filters);
  };

  const startLoadingDish = async (dish: DishModel) => {
    dispatch(onLoadDish(dish));
  };

  const startLoadingEmptyDish = () => dispatch(onLoadDish(dishEmptyState));

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
    startPuttingDishOffer,
    startDeletingDishOffer,
    startDeletingManyDishOffers,
    startUpdatingDish,
    startUpdatingDishImage,
    startUpdatingDishStatus,
    startDeletingDish,
    startDeletingManyDishes,
    startLoadingDishesPaginated,
    startLoadingDishes,
    startLoadingDishesPublished,
    startFilterDishes,
    startLoadingDishById,
    startLoadingDishesWithoutSelectedDish,
    startLoadingDish,
    startLoadingEmptyDish,
  };
};
