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
  ): Promise<void> => {
    try {
      dispatch(onCheking());
      const data =
        await loginGoogleUser(authRepositoryImpl).execute(loginGoogleUserDto);
      localStorage.setItem("token", data.token);
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout());
      throw error;
    }
  };

  const startLoginUser = async (loginUserDto: LoginUserDto) => {
    try {
      dispatch(onCheking());
      const data = await loginUser(authRepositoryImpl).execute(loginUserDto);
      dispatch(onLogin(data.user));
      localStorage.setItem("token", data.token);
    } catch (error) {
      dispatch(onLogout());
      throw error;
    }
  };

  const startRegisteringUser = async (registerUserDto: RegisterUserDto) => {
    try {
      const data =
        await registerUser(authRepositoryImpl).execute(registerUserDto);
      dispatch(onCheking());
      dispatch(setMessages(data.message));
    } catch (error) {
      throw error;
    }
  };

  const startRevalidateToken = async () => {
    try {
      dispatch(onCheking());
      const token = localStorage.getItem("token");
      if (!token || token?.length < 5) return dispatch(onLogout());

      const data = await revalidateToken(authRepositoryImpl).execute();
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout());
      throw error;
    }
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
