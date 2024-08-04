import { useDispatch, useSelector } from "react-redux";
import { DishCategoryRepositoryImpl } from "@/infraestructure/repositories";
import { DishCategoryService } from "@/infraestructure/services";
import {
  type AppState,
  onFinishedLoadingDishCategory,
  onLoadDishCategories,
  onLoadDishCategory,
  onLoadingDishCategory,
} from "@/infraestructure/store";
import {
  CreateDishCategoryRequest,
  UpdateDishCategoryImageRequest,
  UpdateDishCategoryRequest,
  UpdateStatusRequest,
  UploadImageRequest,
} from "@/domain/dtos";
import { useMessageStore } from "./useMessageStore";
import { DishCategoryModel } from "@/model";

const dishCategoryService = new DishCategoryService();
const dishCategoryRepositoryImpl = new DishCategoryRepositoryImpl(
  dishCategoryService,
);

export const useDishCategoryStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessageStore();

  const { dishCategories, dishCategory, isLoading } = useSelector(
    (state: AppState) => state.dishCategory,
  );

  const startCreatingDishCategory = async (
    createDishCategoryRequest: CreateDishCategoryRequest,
    uploadImageRequest: UploadImageRequest,
  ) => {
    uploadImageRequest.validate();

    dispatch(onLoadingDishCategory());

    await dishCategoryRepositoryImpl
      .create(createDishCategoryRequest, uploadImageRequest)
      .then(({ data, message, status }) => {
        startSetMessages([message], status);

        dispatch(onLoadDishCategories([...dishCategories, data]));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUpdatingDishCategory = async (
    updateDishCategoryRequest: UpdateDishCategoryRequest,
  ) => {
    dispatch(onLoadingDishCategory());

    await dishCategoryRepositoryImpl
      .update(updateDishCategoryRequest)
      .then(({ data, message, status }) => {
        dispatch(onLoadDishCategory(data));
        startSetMessages([message], status);

        dispatch(
          onLoadDishCategories(
            dishCategories.map((dishCategory) =>
              dishCategory.id === data.id ? data : dishCategory,
            ),
          ),
        );
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUpdatingDishCategoryImage = async (
    updateDishCategoryImageRequest: UpdateDishCategoryImageRequest,
  ) => {
    updateDishCategoryImageRequest.validate();

    dispatch(onLoadingDishCategory());

    await dishCategoryRepositoryImpl
      .updateImage(updateDishCategoryImageRequest)
      .then(({ data, message, status }) => {
        dispatch(onLoadDishCategory(data));
        startSetMessages([message], status);

        dispatch(
          onLoadDishCategories(
            dishCategories.map((dishCategory) =>
              dishCategory.id === data.id ? data : dishCategory,
            ),
          ),
        );
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUpdatingDishCategoryStatus = async (
    updateStatusRequest: UpdateStatusRequest,
  ) => {
  
    await dishCategoryRepositoryImpl
      .updateStatus(updateStatusRequest)
      .then(({ data }) => {
        dispatch(
          onLoadDishCategories(
            dishCategories.map((dishCategory) =>
              dishCategory.id === data.id ? data : dishCategory,
            ),
          ),
        );
      })
      .catch((error) => {
        dispatch(onFinishedLoadingDishCategory());
        throw error;
      });
  };

  const startDeletingDishCategory = async (dishCategoryId: number) => {
    dispatch(onLoadingDishCategory());

    await dishCategoryRepositoryImpl
      .delete(dishCategoryId)
      .then(({ message, status }) => {
        startSetMessages([message], status);

        dispatch(
          onLoadDishCategories(
            dishCategories.filter(
              (dishCategory) => dishCategory.id !== dishCategoryId,
            ),
          ),
        );
      })
      .catch((error) => {
        dispatch(onFinishedLoadingDishCategory());
        throw error;
      });
  };

  const startDeletingManyDishCategories = async (dishCategoryIds: number[]) => {
    dispatch(onLoadingDishCategory());

    await dishCategoryRepositoryImpl
      .deleteMany(dishCategoryIds)
      .then(({ message, status }) => {
        startSetMessages([message], status);

        dispatch(
          onLoadDishCategories(
            dishCategories.filter(
              (dishCategory) => !dishCategoryIds.includes(dishCategory.id),
            ),
          ),
        );
      })
      .catch((error) => {
        dispatch(onFinishedLoadingDishCategory());
        throw error;
      });
  };

  const startLoadingDishCategories = async () => {
    dispatch(onLoadingDishCategory());

    dishCategoryRepositoryImpl
      .getAll()
      .then(({ data }) => dispatch(onLoadDishCategories(data)))
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishCategoriesPublished = async () => {
    dispatch(onLoadingDishCategory());

    dishCategoryRepositoryImpl
      .getAllPublished()
      .then(({ data }) => dispatch(onLoadDishCategories(data)))
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishCategory = async (
    dishCategory: DishCategoryModel | number,
  ) => {
    dispatch(onLoadingDishCategory());
    if (typeof dishCategory !== "number") {
      dispatch(onLoadDishCategory(dishCategory));
      return;
    }
  };

  return {
    //* Attributes
    dishCategory,
    dishCategories,
    isLoading,

    //* Methods
    startCreatingDishCategory,
    startUpdatingDishCategory,
    startUpdatingDishCategoryImage,
    startUpdatingDishCategoryStatus,
    startDeletingDishCategory,
    startDeletingManyDishCategories,
    startLoadingDishCategory,
    startLoadingDishCategoriesPublished,
    startLoadingDishCategories,
  };
};
