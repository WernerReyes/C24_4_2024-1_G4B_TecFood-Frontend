export interface UserEntity {
  id: number;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  dni: string;
  google: boolean;
  img?: string;
  status: boolean;
  password: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
