import { ZodError } from "zod";
import { OrderDishStatusEnum } from "@/domain/entities";
import { getOrderDishesByUserValidation } from "@/infraestructure/validations";
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
      const validatedData = getOrderDishesByUserValidation.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }
}
