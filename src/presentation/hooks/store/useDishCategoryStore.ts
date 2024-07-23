import { useDispatch, useSelector } from "react-redux";
import { DishCategoryRepositoryImpl } from "@/infraestructure/repositories";
import { DishCategoryService } from "@/infraestructure/services";
import {
  AppState,
  onLoadDishCategories,
  onLoadDishCategory,
  onLoadingDishCategory,
} from "@/infraestructure/store";
import { CreateDishCategoryDto, UploadImageDto } from "@/domain/dtos";
import { useMessageStore } from "./useMessageStore";

const dishCategoryService = new DishCategoryService();
const dishCategoryRepositoryImpl = new DishCategoryRepositoryImpl(
  dishCategoryService,
);

export const useDishCategoryStore = () => {
  const dispatch = useDispatch();
  const { startSetSuccessMessages } = useMessageStore();

  const { dishCategories, isLoading } = useSelector(
    (state: AppState) => state.dishCategory,
  );

  const startCreatingDishCategory = async (
    createDishCategoryDto: CreateDishCategoryDto,
    uploadImageDto: UploadImageDto,
  ) => {
    uploadImageDto.validate();

    dispatch(onLoadingDishCategory());

    await dishCategoryRepositoryImpl
      .create(createDishCategoryDto, uploadImageDto)
      .then(({ dishCategory, message }) => {
        dispatch(onLoadDishCategory(dishCategory));
        startSetSuccessMessages([message]);

        dispatch(onLoadDishCategories([...dishCategories, dishCategory]));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishCategories = async () => {
    dispatch(onLoadingDishCategory());

    dishCategoryRepositoryImpl
      .getAll()
      .then(({ dishCategories }) =>
        dispatch(onLoadDishCategories(dishCategories)),
      )
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
