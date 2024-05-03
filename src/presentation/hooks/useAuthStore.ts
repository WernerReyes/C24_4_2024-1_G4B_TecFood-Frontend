import { RegisterUserDto } from "@/domain/dtos";
import { registerUser } from "@/domain/use-cases/auth";
import { authRepositoryImpl } from "@/infraestructure/repositories";
import { AppState, onCheking } from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { user, isLoading, errorMessage } = useSelector(
    (state: AppState) => state.auth,
  );

  const startRegisteringUser = (registerUserDto: RegisterUserDto) => {
    registerUser(authRepositoryImpl)
      .exceute(registerUserDto)
      .then((user) => onCheking())
      .catch((error) => error);
  };

  return {
    //* Attributes
    user,
    isLoading,
    errorMessage,

    //* Methods
    startRegisteringUser,
  };
};
