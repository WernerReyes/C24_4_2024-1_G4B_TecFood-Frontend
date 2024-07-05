import { ZodError, z } from "zod";
import { PaymentMethodEnum } from "@/domain/entities";

export class ProcessPaymentDto {
  private constructor(
    public readonly orderDishId: number,
    public readonly paymentMethod: PaymentMethodEnum,
  ) {}

  public static create(
    data: ProcessPaymentDto,
  ): [ProcessPaymentDto?, string[]?] {
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
