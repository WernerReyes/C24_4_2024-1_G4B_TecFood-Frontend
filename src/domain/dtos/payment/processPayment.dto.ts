import { PaymentMethodEnum } from "@/domain/entities";
import { dtoValidator } from "@/presentation/utilities";
import { z } from "zod";

export class ProcessPaymentDto {
  constructor(
    public readonly orderDishId: number,
    public readonly paymentMethod: PaymentMethodEnum,
  ) {}

  public validate() {
    dtoValidator(this, ProcessPaymentDto.schema);
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
      paymentMethod: z
        .nativeEnum(PaymentMethodEnum, {
          message:
            "paymentMethod must be one of the following values: " +
            Object.values(PaymentMethodEnum).join(", "),
        })
        .refine(
          (s) =>
            Object.values(PaymentMethodEnum).includes(s as PaymentMethodEnum),
          {
            message:
              "status must be one of the following values: " +
              Object.values(PaymentMethodEnum).join(", "),
          },
        ),
    });
  }
}
