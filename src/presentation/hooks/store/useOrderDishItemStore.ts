import { GetOrderDishItemByOrderUser } from "@/domain/use-cases";
import { OrderDishItemRepositoryImpl } from "@/infraestructure/repositories";
import { OrderDishItemService } from "@/infraestructure/services";
import { onLoadOrderDishItems, type AppState } from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";

const orderDishItemService = new OrderDishItemService();
const orderDishItemRepositoryImpl = new OrderDishItemRepositoryImpl(
  orderDishItemService,
);

export const useOrderDishItemStore = () => {
  const dispatch = useDispatch();
  const { isLoading, orderDishItem, orderDishItems } = useSelector(
    (state: AppState) => state.orderDishItem,
  );

  const startLoadingOrderDishItemsByOrder = async (orderDishId: number) => {
    await new GetOrderDishItemByOrderUser(orderDishItemRepositoryImpl)
      .execute(orderDishId)
      .then(({ orderDishItem }) =>
        dispatch(onLoadOrderDishItems(orderDishItem)),
      )
      .catch(console.error);
  };


  return {
    //* Attributes
    isLoading,
    orderDishItem,
    orderDishItems,

    //* Methods
    startLoadingOrderDishItemsByOrder,
  };
};
