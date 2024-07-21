import { z } from "zod";
import { OrderDishStatusEnum } from "@/domain/entities";
import { dtoValidator } from "@/presentation/utilities";
import { PaginationDto } from "../common";

export class GetOrderDishesByUserDto extends PaginationDto {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly status: { status: OrderDishStatusEnum }[],
  ) {
    super(page, limit);
  }

  public validate() {
    dtoValidator(this, GetOrderDishesByUserDto.schema);
  }

  protected static get schema() {
    return z.object({
      status: z.array(
        z.object({
          status: z
            .nativeEnum(OrderDishStatusEnum)
            .refine((n) => Object.values(OrderDishStatusEnum).includes(n), {
              message: `status must be one of the following values: ${Object.values(OrderDishStatusEnum).join(", ")}`,
            }),
        }),
      ),
      ...super.schema.shape,
    });
  }
}
