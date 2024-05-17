import { getDishesCategory } from "@/domain/use-cases";
import { dishCategoryRepositoryImpl } from "@/infraestructure/repositories";
import {
  AppState,
  onLoadDishCategories,
  onLoadingDishCategory,
} from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";

export const useDishCategoryStore = () => {
  const dispatch = useDispatch();

  const { dishCategories, isLoading } = useSelector(
    (state: AppState) => state.dishCategory,
  );

  const startLoadingDishCategories = async () => {
    dispatch(onLoadingDishCategory());
    await getDishesCategory(dishCategoryRepositoryImpl)
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
