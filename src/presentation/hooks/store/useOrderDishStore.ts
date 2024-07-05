import { useDispatch, useSelector } from "react-redux";
import type {
  GetOrderDishesByUserDto,
  UpdateOrderDishStatusDto,
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
  const { startSetMessages, typeError, typeSuccess } = useMessageStore();

  const { orderDish, orderDishes, filters, status, isLoading, total } =
    useSelector((state: AppState) => state.orderDish);

  const startCreateOrderDish = async () => {
    dispatch(onLoadingOrderDish());
    orderDishRepositoryImpl
      .createOrderDish()
      .then(({ message, orderDish }) => {
        dispatch(onCreateOrderDish(orderDish));
        startSetMessages([message], typeSuccess);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUpdateOrderDishStatus = async (
    updateOrderDishStatusDto: [UpdateOrderDishStatusDto?, string[]?],
    message: string,
  ) => {
    dispatch(onLoadingOrderDish());
    const [orderDishStatus, errors] = updateOrderDishStatusDto;
    if (errors) return startSetMessages(errors, typeError);
    orderDishRepositoryImpl
      .updateOrderDishStatus(orderDishStatus!)
      .then(({ status }) => {
        dispatch(onUpdateOrderDishStatus(status));
        startSetMessages([message], typeSuccess);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startLoadingOrderDishesByUser = async (
    getOrderDishesByUserDto: [GetOrderDishesByUserDto?, string[]?],
  ) => {
    dispatch(onLoadingOrderDish());
    const [getOrderDishesByUserDtoValidated, errors] = getOrderDishesByUserDto;
    if (errors) return startSetMessages(errors, typeError);
    orderDishRepositoryImpl
      .getOrderDishesByUser(getOrderDishesByUserDtoValidated!)
      .then(({ orderDishes, total }) => {
        dispatch(onLoadOrderDishes({ orderDishes, total }));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startGetOrderDishById = async (orderDishId: number) => {
    dispatch(onLoadingOrderDish());
    orderDishRepositoryImpl
      .getOrderDishById(orderDishId)
      .then((orderDish) => {
        dispatch(onCreateOrderDish(orderDish));
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
