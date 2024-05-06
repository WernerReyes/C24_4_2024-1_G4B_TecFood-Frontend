import { UserEntity } from "@/domain/entities";
import { User } from "@/model";

export const userAdapter = (user: UserEntity): User => {
  console.log(user);
  return {
    id: user.id,
    name: user.firstName,
    lastname: user.lastName,
    phone: user.phoneNumber,
    email: user.email,
    dni: user.dni,
    role: user.role.name,
    img: user.imgUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
