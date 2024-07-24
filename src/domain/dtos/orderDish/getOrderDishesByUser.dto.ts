import { z } from "zod";
import { OrderDishStatusEnum } from "@/domain/entities";
import { dtoValidator } from "@/presentation/utilities";
import { PaginationDto, type PaginationDtoModel, PaginationDtoSchema } from "../common";

interface GetOrderDishesByUserDtoModel extends PaginationDtoModel {
  readonly status: { status: OrderDishStatusEnum }[];
}

export class GetOrderDishesByUserDto
  extends PaginationDto
  implements GetOrderDishesByUserDtoModel
{
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

  protected static override get schema(): z.ZodSchema<GetOrderDishesByUserDtoModel> {
    return GetOrderDishesByUserDtoSchema;
  }
}

export const GetOrderDishesByUserDtoSchema = z.object({
  status: z.array(
    z.object({
      status: z
        .nativeEnum(OrderDishStatusEnum)
        .refine((n) => Object.values(OrderDishStatusEnum).includes(n), {
          message: `status must be one of the following values: ${Object.values(OrderDishStatusEnum).join(", ")}`,
        }),
    }),
  ),
  ...PaginationDtoSchema.shape,
});
