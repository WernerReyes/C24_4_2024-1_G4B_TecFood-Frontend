import { useDispatch, useSelector } from "react-redux";
import {
  RegisterUserDto,
  LoginGoogleUserDto,
  LoginUserDto,
} from "@/domain/dtos";
import {
  registerUser,
  loginGoogleUser,
  loginUser,
  revalidateToken,
} from "@/domain/use-cases/auth";
import { authRepositoryImpl } from "@/infraestructure/repositories";
import {
  AppState,
  onCheking,
  setMessages,
  clearMessages,
  onLogin,
  onLogout,
  AuthStatus,
} from "@/infraestructure/store";

export const useAuthStore = () => {
  const { user, status, message } = useSelector(
    (state: AppState) => state.auth,
  );
  const dispatch = useDispatch();

  const startGoogleLoginUser = async (
    loginGoogleUserDto: LoginGoogleUserDto,
  ) => {
    dispatch(onCheking());

    await loginGoogleUser(authRepositoryImpl)
      .execute(loginGoogleUserDto)
      .then(({ user, token }) => {
        dispatch(onLogin(user));
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        dispatch(onLogout());
        console.error(error);
      });
  };

  const startLoginUser = async (loginUserDto: LoginUserDto) => {
    dispatch(onCheking());

    await loginUser(authRepositoryImpl)
      .execute(loginUserDto)
      .then(({ user, token }) => {
        dispatch(onLogin(user));
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        dispatch(onLogout());
        console.error(error);
      });
  };

  const startRegisteringUser = async (registerUserDto: RegisterUserDto) => {
    dispatch(onCheking());

    await registerUser(authRepositoryImpl)
      .execute(registerUserDto)
      .then(({ message }) => dispatch(setMessages(message)))
      .catch((error) => {
        dispatch(onLogout());
        console.error(error);
      });
  };

  const startRevalidateToken = async () => {
    dispatch(onCheking());
    const token = localStorage.getItem("token");
    if (!token || token?.length < 5) return dispatch(onLogout());

    await revalidateToken(authRepositoryImpl)
      .execute()
      .then(({ user }) => dispatch(onLogin(user)))
      .catch((error) => {
        dispatch(onLogout());
        console.error(error);
      });
  };

  return {
    //* Attributes
    user,
    isAuthenticate: status === AuthStatus.AUTHENTICATE,
    isLoading: status === AuthStatus.CHECKING,
    status,
    message,

    //* Methods
    startRegisteringUser,
    startGoogleLoginUser,
    startLoginUser,
    startRevalidateToken,
    clearMessages: () => dispatch(clearMessages()),
  };
};
