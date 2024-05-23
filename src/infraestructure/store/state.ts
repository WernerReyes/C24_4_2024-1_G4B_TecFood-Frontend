import type {
  DishCategoryState,
  DishOfferState,
  DishState,
  UserState,
} from "@/model";
import { AuthStatus } from "./slice/auth.slice";
import { TypeMessage } from "./slice/message.slice";

export interface AppState {
  themes: {
    currentTheme: string;
  };
  message: {
    type: TypeMessage;
    messages: string[],
  };
  user: {
    isLoading: boolean;
    user: UserState;
    users: UserState[];
  };
  dishOffer: {
    isLoading: boolean;
    dishOffer: DishOfferState;
    dishOffers: DishOfferState[];
  };
  auth: {
    status: AuthStatus;
    user: UserState;
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
