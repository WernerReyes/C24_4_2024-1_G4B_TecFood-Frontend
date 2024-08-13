import { RoleEnum } from "@/domain/entities/role.entity";
import { generateEmptyState } from "@/presentation/utilities/generateEmptyState";
import { z } from "zod";

const RoleEnumSchema = z.nativeEnum(RoleEnum);

export const UserModelSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastname: z.string(),
  phone: z.string().nullable(),
  email: z.string(),
  dni: z.string().nullable(),
  img: z.string().nullable(),
  role: RoleEnumSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserModel = z.infer<typeof UserModelSchema>;

/*/ <== ( STRUCTURE ) ==>
export const userEmptyState: UserModel = {
  id: 0,
  name: "",
  lastname: "",
  phone: "",
  email: "",
  dni: "",
  img: "",
  role: RoleEnum.USER,
  createdAt: "" as any as Date,
  updatedAt: "" as any as Date,
};
*/

export const userEmptyState = generateEmptyState<UserModel>(UserModelSchema);
