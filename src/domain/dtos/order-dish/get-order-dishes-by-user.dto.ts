import { ZodError, z } from "zod";
import { OrderDishStatusEnum } from "@/domain/entities";
import { PaginationDto } from "../common";

export class GetOrderDishesByUserDto extends PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly status: { status: OrderDishStatusEnum }[],
  ) {
    super(page, limit);
  }

  public static create(
    data: GetOrderDishesByUserDto,
  ): [GetOrderDishesByUserDto?, string[]?] {
    try {
      const validatedData = this.validations.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }

  protected static get validations() {
    return z.object({
      ...PaginationDto.validations.shape,
      status: z.array(
        z.object({
          status: z
            .nativeEnum(OrderDishStatusEnum)
            .refine((n) => Object.values(OrderDishStatusEnum).includes(n), {
              message: `status must be one of the following values: ${Object.values(OrderDishStatusEnum).join(", ")}`,
            }),
        }),
      ),
    });
  }
}
