import { PaymentMethodEnum } from "@/domain/entities";
import { dtoValidator } from "@/presentation/utilities";
import { z } from "zod";

type ProcessPaymentDtoModel = {
  readonly orderDishId: number;
  readonly paymentMethod: PaymentMethodEnum;
};

export class ProcessPaymentDto implements ProcessPaymentDtoModel {
  constructor(
    public readonly orderDishId: number,
    public readonly paymentMethod: PaymentMethodEnum,
  ) {}

  public validate() {
    dtoValidator(this, ProcessPaymentDto.schema);
  }

  private static get schema(): z.ZodSchema<ProcessPaymentDtoModel> {
    return ProcessPaymentDtoSchema;
  }
}

const ProcessPaymentDtoSchema = z.object({
  orderDishId: z
    .number({
      message: "orderDishId must be a number",
    })
    .positive("orderDishId must be a positive number")
    .int("orderDishId must be an integer")
    .refine((n) => n > 0, {
      message: "orderDishId must be greater than 0",
    }),
  paymentMethod: z
    .nativeEnum(PaymentMethodEnum)
    .refine(
      (s) => Object.values(PaymentMethodEnum).includes(s as PaymentMethodEnum),
      {
        message:
          "paymentMethod must be one of the following values: " +
          Object.values(PaymentMethodEnum).join(", "),
      },
    ),
});
