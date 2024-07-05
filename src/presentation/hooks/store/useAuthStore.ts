import { useDispatch, useSelector } from "react-redux";
import type {
  LoginGoogleUserDto,
  LoginUserDto,
  RegisterUserDto,
} from "@/domain/dtos";
import { AuthRepositoryImpl } from "@/infraestructure/repositories";
import {
  AppState,
  AuthStatus,
  onCheking,
  onLogin,
  onLogout,
  onResetCartDish,
  onResetChatMessages,
  onResetOrderDish,
  onResetOrderDishItem,
  onResetPayment,
} from "@/infraestructure/store";
import { useMessageStore } from "./useMessageStore";
import { AuthService } from "@/infraestructure/services";
import {
  StorageKeys,
  clearStorage,
  setStorage,
} from "@/presentation/utilities";

const { TOKEN } = StorageKeys;

const authService = new AuthService();
const authRepositoryImpl = new AuthRepositoryImpl(authService);

export const useAuthStore = () => {
  const { startSetMessages, typeError, typeSuccess } = useMessageStore();
  const { status, authenticatedUser } = useSelector(
    (state: AppState) => state.auth,
  );

  const dispatch = useDispatch();

  const startCheking = () => dispatch(onCheking());

  const startGoogleLoginUser = async (
    loginGoogleUserDto: [LoginGoogleUserDto?, string[]?],
  ) => {
    const [validatedData, errors] = loginGoogleUserDto;
    if (errors) return startSetMessages(errors, typeError);
    dispatch(onCheking());

    authRepositoryImpl
      .loginGoogle(validatedData!)
      .then(({ user, token }) => {
        dispatch(onLogin(user));
        setStorage(TOKEN, token);
      })
      .catch((error) => {
        dispatch(onLogout());
        throw error;
      });
  };

  const startLoginUser = async (loginUserDto: LoginUserDto) => {
    dispatch(onCheking());

    authRepositoryImpl
      .login(loginUserDto)
      .then(({ user, token }) => {
        dispatch(onLogin(user));
        setStorage(TOKEN, token);
      })
      .catch((error) => {
        dispatch(onLogout());
        throw error;
      });
  };

  const startRegisteringUser = async (registerUserDto: RegisterUserDto) => {
    dispatch(onCheking());

    authRepositoryImpl
      .register(registerUserDto)
      .then(({ message }) => startSetMessages([message], typeSuccess))
      .catch((error) => {
        dispatch(onLogout());
        throw error;
      });
  };

  const startRevalidateToken = async () => {
    dispatch(onCheking());
    const token = localStorage.getItem(TOKEN);
    if (!token || token?.length < 5) return dispatch(onLogout());

    authRepositoryImpl
      .revalidateToken()
      .then(({ user }) => {
        dispatch(onLogin(user));
      })
      .catch((error) => {
        dispatch(onLogout());
        throw error;
      });
  };

  const startLogout = () => {
    dispatch(onLogout());
    dispatch(onResetCartDish());
    dispatch(onResetChatMessages());
    dispatch(onResetOrderDish());
    dispatch(onResetOrderDishItem());
    dispatch(onResetPayment());

    //* Remove all the data from the local storage
    clearStorage();
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
