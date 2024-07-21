import { orderDishAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type {
  GetOrderDishesByUserDto,
  UpdateOrderDishStatusDto,
} from "@/domain/dtos";
import type { OrderDishEntity } from "@/domain/entities";
import type {
  CreateOrderDishResponse,
  GetOrderDishesByUserResponse,
  OrderDishModel,
  UpdateOrderDishStatusResponse,
} from "@/model";
import {
  concatRequestParams,
  convertArrayToRequestParam,
  convertToRequestParam,
} from "@/presentation/utilities";

interface IOrderDishService {
  createOrderDish(): Promise<CreateOrderDishResponse<OrderDishModel>>;
  updateOrderDishStatus(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<UpdateOrderDishStatusResponse>;
  getOrderDishesByUser(
    getOrderDishesByUserDto: GetOrderDishesByUserDto,
  ): Promise<GetOrderDishesByUserResponse<OrderDishModel>>;
  getOrderDishById(orderDishId: number): Promise<OrderDishModel>;
}

export class OrderDishService implements IOrderDishService {
  private prefix: string;

  constructor() {
    this.prefix = "/order-dish";
  }

  public async createOrderDish() {
    try {
      const { data } = await httpRequest<
        CreateOrderDishResponse<OrderDishEntity>
      >(this.prefix, "POST");
      return { ...data, orderDish: orderDishAdapter(data.orderDish) };
    } catch (error) {
      throw error;
    }
  }

  public async updateOrderDishStatus({
    orderDishId,
    status,
  }: UpdateOrderDishStatusDto) {
    try {
      const { data } = await httpRequest<UpdateOrderDishStatusResponse>(
        `${this.prefix}/${orderDishId}/status`,
        "PUT",
        { status },
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getOrderDishesByUser({
    status,
    ...rest
  }: GetOrderDishesByUserDto) {
    try {
      const requestParam = convertToRequestParam(rest);
      const requestParamCategory = convertArrayToRequestParam(status, "status");
      const requestParams = concatRequestParams([
        requestParam,
        requestParamCategory,
      ]);

      const { data } = await httpRequest<
        GetOrderDishesByUserResponse<OrderDishEntity>
      >(`${this.prefix}/user${requestParams}`, "GET");

      return {
        ...data,
        orderDishes: data.orderDishes.map((orderDish) =>
          orderDishAdapter(orderDish),
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  public async getOrderDishById(orderDishId: number) {
    try {
      const { data } = await httpRequest<OrderDishEntity>(
        `${this.prefix}/${orderDishId}`,
        "GET",
      );
      return orderDishAdapter(data);
    } catch (error) {
      throw error;
    }
  }
}
