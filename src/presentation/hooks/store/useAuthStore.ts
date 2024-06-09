import {
  LoginGoogleUserDto,
  LoginUserDto,
  RegisterUserDto,
} from "@/domain/dtos";
import {
  LoginGoogleUser,
  LoginUser,
  RegisterUser,
  RevalidateToken,
} from "@/domain/use-cases";
import { AuthRepositoryImpl } from "@/infraestructure/repositories";
import {
  AppState,
  AuthStatus,
  TypeMessage,
  onCheking,
  onLogin,
  onLogout,
} from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";
import { useMessage } from "../useMessage";
import { AuthService } from "@/infraestructure/services";

const authService = new AuthService();
const authRepositoryImpl = new AuthRepositoryImpl(authService);

export const useAuthStore = () => {
  const { startSetMessages } = useMessage();
  const { status, authenticatedUser } = useSelector((state: AppState) => state.auth);

  const dispatch = useDispatch();

  const startCheking = () => dispatch(onCheking());

  const startGoogleLoginUser = async (
    loginGoogleUserDto: [LoginGoogleUserDto?, string[]?],
  ) => {
    const [validatedData, errors] = loginGoogleUserDto;
    if (errors) return startSetMessages(errors, TypeMessage.ERROR);
    dispatch(onCheking());

    await new LoginGoogleUser(authRepositoryImpl)
      .execute(validatedData!)
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

    await new LoginUser(authRepositoryImpl)
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

    await new RegisterUser(authRepositoryImpl)
      .execute(registerUserDto)
      .then(({ message }) => startSetMessages([message], TypeMessage.SUCCESS))
      .catch((error) => {
        dispatch(onLogout());
        console.error(error);
      });
  };

  const startRevalidateToken = async() => {
    dispatch(onCheking());
    const token = localStorage.getItem("token");
    if (!token || token?.length < 5) return dispatch(onLogout());

    await new RevalidateToken(authRepositoryImpl)
      .execute()
      .then(({ user }) => dispatch(onLogin(user)))
      .catch((error) => {
        dispatch(onLogout());
        console.error(error);
      });
  };

  const startLogout = () => {
    dispatch(onLogout());
    localStorage.removeItem("token");
  };

  return {
    //* Attributes
    authenticatedUser,
    isAuthenticate: status === AuthStatus.AUTHENTICATE,
    isLoading: status === AuthStatus.CHECKING,
    status,

    //* Methods
    startRegisteringUser,
    startGoogleLoginUser,
    startLoginUser,
    startRevalidateToken,
    startCheking,
    startLogout,
  };
};
