import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "@/domain/use-cases/dish";
import { dishRepositoryImpl } from "@/infraestructure/repositories";
import { AppState, onLoadDishes, onLoadingDish } from "@/infraestructure/store";

export const useDishStore = () => {
  const dispatch = useDispatch();

  const { dishes, isLoading } = useSelector((state: AppState) => state.dish);

  const startLoadingDishes = async() => {
    dispatch(onLoadingDish());
    await getDishes(dishRepositoryImpl)
      .execute()
      .then(({ dishes }) => dispatch(onLoadDishes(dishes)))
      .catch(console.error);
  };

  return {
    //* Attributes
    dishes,
    isLoading,

    //* Methods
    startLoadingDishes,
  };
};
