import type {
  DishCategoryState,
  DishOfferState,
  DishState,
  UserState,
} from "@/model";
import { AuthStatus } from "./slice/auth.slice";

export interface AppState {
  user: {
    isLoading: boolean;
    user: UserState;
    users: UserState[];
  };
  themes: {
    currentTheme: string;
  };
  dishOffer: {
    isLoading: boolean;
    dishOffer: DishOfferState;
    dishOffers: DishOfferState[];
  };
  auth: {
    status: AuthStatus;
    user: UserState;
    message: string | undefined;
  };
  dish: {
    isLoading: boolean;
    dish: DishState;
    dishes: DishState[];
  };
  dishCategory: {
    isLoading: boolean;
    dishCategory: DishCategoryState;
    dishCategories: DishCategoryState[];
  };
}
