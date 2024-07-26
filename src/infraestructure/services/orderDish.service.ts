import { orderDishAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type {
  ApiResponse,
  GetOrderDishesByUserDto,
  GetOrderDishesByUserResponse,
  PagedResponse,
  UpdateOrderDishStatusDto,
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
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<ApiResponse<OrderDishStatusEnum>>;
  getOrderDishesByUser(
    getOrderDishesByUserDto: GetOrderDishesByUserDto,
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
      const { data, ...rest } = await httpRequest<OrderDishEntity>(
        this.prefix,
        "POST",
      );
      return { data: orderDishAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }

  public async updateOrderDishStatus({
    orderDishId,
    status,
  }: UpdateOrderDishStatusDto) {
    try {
      return await httpRequest<OrderDishStatusEnum>(
        `${this.prefix}/${orderDishId}/status`,
        "PUT",
        { status },
      );
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

      const { data, ...restResponse } = await httpRequest<
        PagedResponse<GetOrderDishesByUserResponse<OrderDishEntity>>
      >(`${this.prefix}/user${requestParams}`, "GET");

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
      const { data, ...rest } = await httpRequest<OrderDishEntity>(
        `${this.prefix}/${orderDishId}`,
        "GET",
      );
      return { data: orderDishAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }
}
