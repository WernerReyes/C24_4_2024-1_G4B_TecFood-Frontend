import { useDispatch, useSelector } from "react-redux";
import { CartDishRepositoryImpl } from "@/infraestructure/repositories";
import {
  AppState,
  TypeMessage,
  onAddOneDish,
  onDeleteOneDish,
  ondeleteAllDishes,
  onLoadCartDish,
  onLoadingCartDish,
  onLoadCartDishItem,
} from "@/infraestructure/store";
import {
  AddOneDish,
  DeleteOneDish,
  GetDishesByUser,
  DeleteAllDishes,
  GetDishByDishId,
} from "@/domain/use-cases";
import { CartDishService } from "../../infraestructure/services";
import { useMessage } from "./useMessage";

const cartDishService = new CartDishService();
const cartDishRepositoryImpl = new CartDishRepositoryImpl(cartDishService);

export const useCartStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessage();

  const { isLoading, cart, cartItem, totalQuantity, totalPayment } = useSelector(
    (state: AppState) => state.cartDish,
  );

  const startAddOneDish = async (dishId: number) => {
    dispatch(onLoadingCartDish());
    await new AddOneDish(cartDishRepositoryImpl)
      .execute(dishId)
      .then(({ message }) => {
        dispatch(onAddOneDish());
        startSetMessages([message], TypeMessage.SUCCESS);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startDeleteOneDish = async (dishId: number) => {
    dispatch(onLoadingCartDish());
    await new DeleteOneDish(cartDishRepositoryImpl)
      .execute(dishId)
      .then(() => dispatch(onDeleteOneDish()))
      .catch((error) => {
        throw error;
      });
  };

  const startdeleteAllDishes = async (cartId: number) => {
    dispatch(onLoadingCartDish());
    await new DeleteAllDishes(cartDishRepositoryImpl)
      .execute(cartId)
      .then(({ quantity }) => {
        dispatch(ondeleteAllDishes(quantity));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishesByUser = async () => {
    dispatch(onLoadingCartDish());
    await new GetDishesByUser(cartDishRepositoryImpl)
      .execute()
      .then((data) => {
        dispatch(
          onLoadCartDish({
            cart: data.cart,
            totalQuantity: data.totalQuantity,
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
    await new GetDishByDishId(cartDishRepositoryImpl)
      .execute(dishId)
      .then(({ cartItem }) => {
        dispatch(
          onLoadCartDishItem({
            ...cartItem,
          }),
        );
      })
      .catch((error) => {
        throw error;
      });
  };

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
    startLoadingDishByDishId,
  };
};
