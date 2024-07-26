import { useDispatch, useSelector } from "react-redux";
import { CartDishRepositoryImpl } from "@/infraestructure/repositories";
import {
  type AppState,
  onAddOneDish,
  onDeleteOneDish,
  onLoadCartDish,
  onLoadCartDishItem,
  onLoadTotalDishesByUser,
  onLoadingCartDish,
  onDeleteAllDishes,
  onResetCartDish,
} from "@/infraestructure/store";
import { CartDishService } from "@/infraestructure/services";
import { useMessageStore } from "../";

const cartDishService = new CartDishService();
const cartDishRepositoryImpl = new CartDishRepositoryImpl(cartDishService);

export const useCartStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessageStore();

  const { isLoading, cart, cartItem, totalQuantity, totalPayment } =
    useSelector((state: AppState) => state.cartDish);

  const startAddOneDish = async (dishId: number) => {
    dispatch(onLoadingCartDish());
    cartDishRepositoryImpl
      .addOneDish(dishId)
      .then(({ message, status }) => {
        dispatch(onAddOneDish());
        startSetMessages([message], status);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startDeleteOneDish = async (dishId: number) => {
    dispatch(onLoadingCartDish());
    cartDishRepositoryImpl
      .deleteOneDish(dishId)
      .then(() => dispatch(onDeleteOneDish()))
      .catch((error) => {
        throw error;
      });
  };

  const startdeleteAllDishes = async (cartId: number) => {
    dispatch(onLoadingCartDish());
    cartDishRepositoryImpl
      .deleteAllDishes(cartId)
      .then(({ data }) => {
        dispatch(onDeleteAllDishes(data));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishesByUser = async () => {
    dispatch(onLoadingCartDish());
    cartDishRepositoryImpl
      .getDishesByUser()
      .then(({ data }) => {
        dispatch(
          onLoadCartDish({
            cart: data.cart,
            totalPayment: data.totalPayment,
          }),
        );
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishByDishId = async (dishId: number) => {
    dispatch(onLoadingCartDish());
    cartDishRepositoryImpl
      .getDishByDishId(dishId)

      .then(({ data }) => {
        dispatch(onLoadCartDishItem(data));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingTotalDishesByUser = async () => {
    dispatch(onLoadingCartDish());
    cartDishRepositoryImpl
      .getTotalDishesByUser()
      .then(({ data }) => dispatch(onLoadTotalDishesByUser(data)))
      .catch((error) => {
        throw error;
      });
  };

  const startResetCartDish = () => dispatch(onResetCartDish());

  return {
    //* Attributes
    totalPayment,
    totalQuantity,
    cart,
    cartItem,
    isLoading,

    //* Methods
    startAddOneDish,
    startDeleteOneDish,
    startdeleteAllDishes,
    startLoadingDishesByUser,
    startLoadingTotalDishesByUser,
    startLoadingDishByDishId,
    startResetCartDish,
  };
};
