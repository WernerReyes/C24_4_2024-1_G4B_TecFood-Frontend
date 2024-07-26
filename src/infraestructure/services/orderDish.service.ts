import { orderDishAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type {
  ApiResponse,
  GetOrderDishesByUserRequest,
  GetOrderDishesByUserResponse,
  PagedResponse,
  UpdateOrderDishStatusRequest,
} from "@/domain/dtos";
import type { OrderDishEntity, OrderDishStatusEnum } from "@/domain/entities";
import type { OrderDishModel } from "@/model";
import {
  concatRequestParams,
  convertArrayToRequestParam,
  convertToRequestParam,
} from "@/presentation/utilities";

interface IOrderDishService {
  createOrderDish(): Promise<ApiResponse<OrderDishModel>>;
  updateOrderDishStatus(
    updateOrderDishStatusRequest: UpdateOrderDishStatusRequest,
  ): Promise<ApiResponse<OrderDishStatusEnum>>;
  getOrderDishesByUser(
    getOrderDishesByUserRequest: GetOrderDishesByUserRequest,
  ): Promise<
    ApiResponse<PagedResponse<GetOrderDishesByUserResponse<OrderDishModel>>>
  >;
  getOrderDishById(orderDishId: number): Promise<ApiResponse<OrderDishModel>>;
}

export class OrderDishService implements IOrderDishService {
  private prefix: string;

  constructor() {
    this.prefix = "/order-dish";
  }

  public async createOrderDish() {
    try {
      const { data, ...rest } = await httpRequest.post<OrderDishEntity>(
        this.prefix,
      );
      return { data: orderDishAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }

  public async updateOrderDishStatus({
    orderDishId,
    status,
  }: UpdateOrderDishStatusRequest) {
    try {
      return await httpRequest.put<OrderDishStatusEnum>(
        `${this.prefix}/${orderDishId}/status`,
        { status },
      );
    } catch (error) {
      throw error;
    }
  }

  public async getOrderDishesByUser({
    status,
    ...rest
  }: GetOrderDishesByUserRequest) {
    try {
      const requestParam = convertToRequestParam(rest);
      const requestParamCategory = convertArrayToRequestParam(status, "status");
      const requestParams = concatRequestParams([
        requestParam,
        requestParamCategory,
      ]);

      const { data, ...restResponse } = await httpRequest.get<
        PagedResponse<GetOrderDishesByUserResponse<OrderDishEntity>>
      >(`${this.prefix}/user${requestParams}`);

      return {
        ...restResponse,
        data: {
          ...data,
          content: {
            ...data.content,
            orderDishes: data.content.orderDishes.map(orderDishAdapter),
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  public async getOrderDishById(orderDishId: number) {
    try {
      const { data, ...rest } = await httpRequest.get<OrderDishEntity>(
        `${this.prefix}/${orderDishId}`,
      );
      return { data: orderDishAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }
}
