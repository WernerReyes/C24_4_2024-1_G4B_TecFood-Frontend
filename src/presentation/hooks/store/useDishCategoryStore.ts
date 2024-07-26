import { useDispatch, useSelector } from "react-redux";
import { DishCategoryRepositoryImpl } from "@/infraestructure/repositories";
import { DishCategoryService } from "@/infraestructure/services";
import {
  type AppState,
  onLoadDishCategories,
  onLoadDishCategory,
  onLoadingDishCategory,
} from "@/infraestructure/store";
import { CreateDishCategoryRequest, UploadImageRequest } from "@/domain/dtos";
import { useMessageStore } from "./useMessageStore";

const dishCategoryService = new DishCategoryService();
const dishCategoryRepositoryImpl = new DishCategoryRepositoryImpl(
  dishCategoryService,
);

export const useDishCategoryStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessageStore();

  const { dishCategories, isLoading } = useSelector(
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
        dispatch(onLoadDishCategory(data));
        startSetMessages([message], status);

        dispatch(onLoadDishCategories([...dishCategories, data]));
      })
      .catch((error) => {
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

  return {
    //* Attributes
    dishCategories,
    isLoading,

    //* Methods
    startCreatingDishCategory,
    startLoadingDishCategories,
  };
};
