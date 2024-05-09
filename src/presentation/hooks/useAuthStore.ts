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
} from "@/domain/use-cases/auth";
import { authRepositoryImpl } from "@/infraestructure/repositories";
import {
  AppState,
  onCheking,
  setMessages,
  clearMessages,
  onLogin,
  onLogout,
} from "@/infraestructure/store";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { user, isLoading, message } = useSelector(
    (state: AppState) => state.auth,
  );

  const startGoogleLoginUser = (loginGoogleUserDto: LoginGoogleUserDto) => {
    loginGoogleUser(authRepositoryImpl)
      .execute(loginGoogleUserDto)
      .then((data) => {
        dispatch(onCheking());
        dispatch(onLogin(data.user));
        localStorage.setItem("token", data.token);
        dispatch(setMessages(data.message));
      })
      .catch((error) => error);
  };

  const startLoginUser = (loginUserDto: LoginUserDto) => {
    loginUser(authRepositoryImpl)
      .execute(loginUserDto)
      .then((data) => {
        dispatch(onCheking());
        dispatch(onLogin(data.user));
        localStorage.setItem("token", data.token);
        dispatch(setMessages(data.message));
      })
      .catch((error) => error);
  };

  const startRegisteringUser = (registerUserDto: RegisterUserDto) => {
    registerUser(authRepositoryImpl)
      .execute(registerUserDto)
      .then((data) => {
        dispatch(onCheking());
        dispatch(setMessages(data.message));
      })
      .catch((error) => error);
  };

  const checkAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token || token?.length < 5) return dispatch(onLogout());

    
  };

  return {
    //* Attributes
    user,
    isLoading,
    message,

    //* Methods
    startRegisteringUser,
    startGoogleLoginUser,
    startLoginUser,
    clearMessages: () => dispatch(clearMessages()),
  };
};
