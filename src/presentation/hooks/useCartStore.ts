import { useDispatch, useSelector } from "react-redux";
import { CartRepositoryImpl } from "@/infraestructure/repositories";
import {
  AppState,
  TypeMessage,
  onAddOneDish,
  onDeleteOneDish,
  ondeleteAllDishes,
  onLoadCart,
  onLoadingCart,
  onLoadCartItem,
} from "@/infraestructure/store";
import {
  AddOneDish,
  DeleteOneDish,
  GetDishesByUser,
  DeleteAllDishes,
  GetDishByDishId,
} from "@/domain/use-cases";
import { CartService } from "../../infraestructure/services";
import { useMessage } from "./useMessage";

const cartService = new CartService();
const cartRepositoryImpl = new CartRepositoryImpl(cartService);

export const useCartStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessage();

  const { isLoading, cart, cartItem, totalQuantity, totalPayment } = useSelector(
    (state: AppState) => state.cart,
  );

  const startAddOneDish = async (dishId: number) => {
    dispatch(onLoadingCart());
    await new AddOneDish(cartRepositoryImpl)
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
    dispatch(onLoadingCart());
    await new DeleteOneDish(cartRepositoryImpl)
      .execute(dishId)
      .then(() => dispatch(onDeleteOneDish()))
      .catch((error) => {
        throw error;
      });
  };

  const startdeleteAllDishes = async (cartId: number) => {
    dispatch(onLoadingCart());
    await new DeleteAllDishes(cartRepositoryImpl)
      .execute(cartId)
      .then(({ quantity }) => {
        dispatch(ondeleteAllDishes(quantity));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingDishesByUser = async () => {
    dispatch(onLoadingCart());
    await new GetDishesByUser(cartRepositoryImpl)
      .execute()
      .then((data) => {
        dispatch(
          onLoadCart({
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
    dispatch(onLoadingCart());
    await new GetDishByDishId(cartRepositoryImpl)
      .execute(dishId)
      .then(({ cartItem }) => {
        dispatch(
          onLoadCartItem({
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
