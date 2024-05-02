import { useDispatch, useSelector } from "react-redux";
import {
  AppState,
  onLoadDishOffers,
  onLoadingDishOffers,
} from "@/infraestructure/store";
import { dishOfferRepositoryImpl } from "@/infraestructure/repositories";
import { getDishOffers } from "@/domain/use-cases";

export const useDishOffer = () => {
  const dispatch = useDispatch();

  const { dishOffers, isLoading } = useSelector(
    (state: AppState) => state.dishOffer,
  );

  const startLoadingDishOffers = () => {
    dispatch(onLoadingDishOffers());

    getDishOffers(dishOfferRepositoryImpl)
      .execute()
      .then((dishOffers) => dispatch(onLoadDishOffers(dishOffers)))
      .catch((error) => error);
  };

  return {
    //* Attributes
    dishOffers,
    isLoading,

    //* Methods
    startLoadingDishOffers,
  };
};
