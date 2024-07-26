import { useDispatch, useSelector } from "react-redux";
import type {
  GetOrderDishesByUserRequest,
  UpdateOrderDishStatusRequest,
} from "@/domain/dtos";
import { OrderDishRepositoryImpl } from "@/infraestructure/repositories";
import { OrderDishService } from "@/infraestructure/services";
import {
  onCreateOrderDish,
  onLoadOrderDishes,
  onLoadingOrderDish,
  onSetOrderDishFilters,
  onUpdateOrderDishStatus,
  type AppState,
} from "@/infraestructure/store";
import { useMessageStore } from "./useMessageStore";
import { OrderDishStatusEnum } from "@/domain/entities";
import { StorageKeys, setStorage } from "@/presentation/utilities";
import type { OrderDishFilter } from "@/model";

const { ORDER_DISH_FILTERS } = StorageKeys;

const orderDishService = new OrderDishService();
const orderDishRepositoryImpl = new OrderDishRepositoryImpl(orderDishService);

export const useOrderDishStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessageStore();

  const { orderDish, orderDishes, filters, status, isLoading, total } =
    useSelector((state: AppState) => state.orderDish);

  const startCreateOrderDish = async () => {
    dispatch(onLoadingOrderDish());
    orderDishRepositoryImpl
      .createOrderDish()
      .then(({ message, data, status }) => {
        dispatch(onCreateOrderDish(data));
        startSetMessages([message], status);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUpdateOrderDishStatus = async (
    updateOrderDishStatusRequest: UpdateOrderDishStatusRequest,
    message: string,
  ) => {
    updateOrderDishStatusRequest.validate();

    dispatch(onLoadingOrderDish());

    orderDishRepositoryImpl
      .updateOrderDishStatus(updateOrderDishStatusRequest)
      .then(({ status, data }) => {
        dispatch(onUpdateOrderDishStatus(data));
        startSetMessages([message], status);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingOrderDishesByUser = async (
    getOrderDishesByUserRequest: GetOrderDishesByUserRequest,
  ) => {
    getOrderDishesByUserRequest.validate();

    dispatch(onLoadingOrderDish());

    orderDishRepositoryImpl
      .getOrderDishesByUser(getOrderDishesByUserRequest)
      .then(({ data }) => {
        dispatch(
          onLoadOrderDishes({
            orderDishes: data.content.orderDishes,
            total: data.total,
          }),
        );
      })
      .catch((error) => {
        throw error;
      });
  };

  const startGetOrderDishById = async (orderDishId: number) => {
    dispatch(onLoadingOrderDish());
    orderDishRepositoryImpl
      .getOrderDishById(orderDishId)
      .then(({ data }) => {
        dispatch(onCreateOrderDish(data));
      })
      .catch(console.error);
  };

  const startFilterOrderDish = async (filters: OrderDishFilter) => {
    dispatch(onLoadingOrderDish());
    dispatch(onSetOrderDishFilters(filters));
    setStorage(ORDER_DISH_FILTERS, filters);
  };

  const startResetStatus = () =>
    dispatch(onUpdateOrderDishStatus(OrderDishStatusEnum.PENDING));

  return {
    //* Atributes
    total,
    filters,
    status,
    orderDish,
    orderDishes,
    isLoading,

    //* Methods
    startLoadingOrderDishesByUser,
    startUpdateOrderDishStatus,
    startCreateOrderDish,
    startResetStatus,
    startFilterOrderDish,
    startGetOrderDishById,
  };
};
