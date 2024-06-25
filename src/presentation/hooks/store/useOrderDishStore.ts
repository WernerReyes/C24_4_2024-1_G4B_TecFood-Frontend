import { useDispatch, useSelector } from "react-redux";
import {
  GetOrderDishesByUserDto,
  UpdateOrderDishStatusDto,
} from "@/domain/dtos";
import {
  CreateOrderDish,
  GetOrderDishesByUser,
  UpdateOrderDishStatus,
} from "@/domain/use-cases";
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
import { useMessage } from "../useMessage";
import { OrderDishStatusEnum } from "@/domain/entities";
import { setStorage } from "@/presentation/utilities";
import type { OrderDishFilter } from "@/model";

const orderDishService = new OrderDishService();
const orderDishRepositoryImpl = new OrderDishRepositoryImpl(orderDishService);

export const useOrderDishStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages, typeError, typeSuccess } = useMessage();

  const { orderDish, orderDishes, filters, status, isLoading, total } =
    useSelector((state: AppState) => state.orderDish);

  const startCreateOrderDish = async () => {
    dispatch(onLoadingOrderDish());
    await new CreateOrderDish(orderDishRepositoryImpl)
      .execute()
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
    const [orderDishStatus, errors] = updateOrderDishStatusDto;
    if (errors) return startSetMessages(errors, typeError);

    dispatch(onLoadingOrderDish());
    await new UpdateOrderDishStatus(orderDishRepositoryImpl)
      .execute(orderDishStatus!)
      .then(({ status }) => {
        dispatch(onUpdateOrderDishStatus(status));
        startSetMessages([message], typeSuccess);
      })
      .catch(console.error);
  };

  const startLoadingOrderDishesByUser = async (
    getOrderDishesByUserDto: [GetOrderDishesByUserDto?, string[]?],
  ) => {
    const [getOrderDishesByUserDtoValidated, errors] = getOrderDishesByUserDto;
    if (errors) return startSetMessages(errors, typeError);

    dispatch(onLoadingOrderDish());
    await new GetOrderDishesByUser(orderDishRepositoryImpl)
      .execute(getOrderDishesByUserDtoValidated!)
      .then(({ orderDishes, total }) => {
        dispatch(onLoadOrderDishes({ orderDishes, total }));
      })
      .catch(console.error);
  };

  const startFilterOrderDish = async (filters: OrderDishFilter) => {
    dispatch(onLoadingOrderDish());
    dispatch(onSetOrderDishFilters(filters));
    setStorage("orderDishFilters", filters);
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
  };
};
