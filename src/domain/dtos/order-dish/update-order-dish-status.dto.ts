import { OrderDishStatusEnum } from "@/domain/entities";
import { updateOrderDishStatusValidation } from "@/infraestructure/validations";
import { ZodError } from "zod";

export class UpdateOrderDishStatusDto {
  
    private constructor(
        public readonly orderDishId: number,
        public readonly status: OrderDishStatusEnum,
    ) {}


    public static create(data: UpdateOrderDishStatusDto): [UpdateOrderDishStatusDto?, string[]?] {
        try {
          const validatedData = updateOrderDishStatusValidation.parse(data);
          return [validatedData, undefined];
        } catch (error) {
          if (error instanceof ZodError)
            return [undefined, error.issues.map((issue) => issue.message)];
          throw error;
        }
      }
    

}