import { orderDishAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type {
  GetOrderDishesByUserDto,
  UpdateOrderDishStatusDto,
} from "@/domain/dtos";
import type {
  CreateOrderDishResponse,
  GetOrderDishesByUserResponse,
  UpdateOrderDishStatusResponse,
} from "@/domain/entities";
import type {
  CreateOrderDishModel,
  GetOrderDishesByUserModel,
  UpdateOrderDishStatusModel,
} from "@/model";
import {
  concatRequestParams,
  convertArrayToRequestParam,
  convertToRequestParam,
} from "@/presentation/utilities";

interface IOrderDishService {
  createOrderDish(): Promise<CreateOrderDishModel>;
  updateOrderDishStatus(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<UpdateOrderDishStatusModel>;
  getOrderDishesByUser(
    getOrderDishesByUserDto: GetOrderDishesByUserDto,
  ): Promise<GetOrderDishesByUserModel>;
}

export class OrderDishService implements IOrderDishService {
  private baseUrl = "/order-dish";

  public async createOrderDish(): Promise<CreateOrderDishModel> {
    try {
      const { data } = await httpRequest<CreateOrderDishResponse>(
        this.baseUrl,
        "POST",
      );
      return { ...data, orderDish: orderDishAdapter(data.orderDish) };
    } catch (error) {
      throw error;
    }
  }

  public async updateOrderDishStatus({
    orderDishId,
    status,
  }: UpdateOrderDishStatusDto): Promise<UpdateOrderDishStatusModel> {
    try {
      const { data } = await httpRequest<UpdateOrderDishStatusResponse>(
        `${this.baseUrl}/${orderDishId}/status`,
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
  }: GetOrderDishesByUserDto): Promise<GetOrderDishesByUserModel> {
    try {
      const requestParam = convertToRequestParam(rest);
      const requestParamCategory = convertArrayToRequestParam(status, "status");
      const requestParams = concatRequestParams([
        requestParam,
        requestParamCategory,
      ]);

      console.log(requestParams);

      const { data } = await httpRequest<GetOrderDishesByUserResponse>(
        `${this.baseUrl}/user${requestParams}`,
        "GET",
      );
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
}
