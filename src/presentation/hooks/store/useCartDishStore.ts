import { useDispatch, useSelector } from "react-redux";
import { CartDishRepositoryImpl } from "@/infraestructure/repositories";
import { CartDishService } from "@/infraestructure/services";
import {
  type AppState,
  onLoadCartDish,
  onLoadCartDishItem,
  onLoadTotalQuantity,
  onLoadingCartDish,
  onResetCartDish
} from "@/infraestructure/store";
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
        dispatch(onLoadTotalQuantity(totalQuantity + 1));
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
      .then(() => dispatch(onLoadTotalQuantity(totalQuantity - 1)))
      .catch((error) => {
        throw error;
      });
  };

  const startdeleteAllDishes = async (cartId: number) => {
    dispatch(onLoadingCartDish());
    cartDishRepositoryImpl
      .deleteAllDishes(cartId)
      .then(({ data }) => {
        dispatch(onLoadTotalQuantity(totalQuantity - data));
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
      .then(({ data }) => dispatch(onLoadTotalQuantity(data)))
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
