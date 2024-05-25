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
} from "@/infraestructure/store";
import {
  AddOneDish,
  DeleteOneDish,
  GetDishesByUser,
  DeleteAllDishes,
} from "@/domain/use-cases";
import { CartService } from "../../infraestructure/services";
import { useMessage } from "./useMessage";

const cartService = new CartService();
const cartRepositoryImpl = new CartRepositoryImpl(cartService);

export const useCartStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessage();

  const { isLoading, cart, totalQuantity, totalPayment } = useSelector(
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
      .catch(console.error);
  };

  const startDeleteOneDish = async (dishId: number) => {
    dispatch(onLoadingCart());
    await new DeleteOneDish(cartRepositoryImpl)
      .execute(dishId)
      .then(() => dispatch(onDeleteOneDish()))
      .catch(console.error);
  };

  const startdeleteAllDishes = async (cartId: number) => {
    dispatch(onLoadingCart());
    await new DeleteAllDishes(cartRepositoryImpl)
      .execute(cartId)
      .then(({ quantity }) => {
        console.log(quantity);
        dispatch(ondeleteAllDishes(quantity));
      })
      .catch(console.error);
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
      .catch(console.error);
  };

  return {
    //* Attributes
    totalPayment,
    totalQuantity,
    cart,
    isLoading,

    //* Methods
    startAddOneDish,
    startDeleteOneDish,
    startdeleteAllDishes,
    startLoadingDishesByUser,
  };
};
