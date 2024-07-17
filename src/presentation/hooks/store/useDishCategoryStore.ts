import { useDispatch, useSelector } from "react-redux";
import { DishCategoryRepositoryImpl } from "@/infraestructure/repositories";
import { DishCategoryService } from "@/infraestructure/services";
import {
  AppState,
  onLoadDishCategories,
  onLoadingDishCategory,
} from "@/infraestructure/store";

const dishCategoryService = new DishCategoryService();
const dishCategoryRepositoryImpl = new DishCategoryRepositoryImpl(
  dishCategoryService,
);

export const useDishCategoryStore = () => {
  const dispatch = useDispatch();

  const { dishCategories, isLoading } = useSelector(
    (state: AppState) => state.dishCategory,
  );

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
    startLoadingDishCategories,
  };
};
