import { UserEntity } from "@/domain/entities";
import { User } from "@/model";

export const userAdapter = (user: UserEntity): User => {
  return {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    phone: user.phone,
    email: user.email,
    dni: user.dni,
    img: user.img,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
