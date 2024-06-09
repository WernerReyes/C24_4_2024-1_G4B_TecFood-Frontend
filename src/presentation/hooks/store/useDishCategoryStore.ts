import { useDispatch, useSelector } from "react-redux";
import { GetDishCategories } from "@/domain/use-cases";
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
    await new GetDishCategories(dishCategoryRepositoryImpl)
      .execute()
      .then(({ dishCategories }) =>
        dispatch(onLoadDishCategories(dishCategories)),
      )
      .catch(console.error);
  };

  return {
    //* Attributes
    dishCategories,
    isLoading,

    //* Methods
    startLoadingDishCategories,
  };
};
