import { ZodError, z } from "zod";
import { OrderDishStatusEnum } from "@/domain/entities";

export class UpdateOrderDishStatusDto {
  private constructor(
    public readonly orderDishId: number,
    public readonly status: OrderDishStatusEnum,
  ) {}

  public static create(
    data: UpdateOrderDishStatusDto,
  ): [UpdateOrderDishStatusDto?, string[]?] {
    try {
      const validatedData = this.validations.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }

  private static get validations() {
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
