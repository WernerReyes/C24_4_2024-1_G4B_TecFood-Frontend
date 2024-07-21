import { OrderDishStatusEnum } from "@/domain/entities";
import { dtoValidator } from "@/presentation/utilities";
import { z } from "zod";

export class UpdateOrderDishStatusDto {
  constructor(
    public readonly orderDishId: number,
    public readonly status: OrderDishStatusEnum,
  ) {}

  public validate() {
    dtoValidator(this, UpdateOrderDishStatusDto.schema);
  }

  private static get schema() {
    return z.object({
      orderDishId: z
        .number({
          message: "orderDishId must be a number",
        })
        .positive({
          message: "orderDishId must be a positive number",
        })
        .int({
          message: "orderDishId must be an integer",
        })
        .refine((n) => n > 0, {
          message: "orderDishId must be greater than 0",
        }),
      status: z
        .nativeEnum(OrderDishStatusEnum)
        .refine(
          (s) =>
            Object.values(OrderDishStatusEnum).includes(
              s as OrderDishStatusEnum,
            ),
          {
            message:
              "status must be one of the following values: pending, accepted, rejected",
          },
        ),
    });
  }
}
