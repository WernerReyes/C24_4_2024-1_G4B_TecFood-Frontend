import { useDispatch, useSelector } from "react-redux";
import type { LoginGoogleRequest, LoginRequest, RegisterRequest } from "@/domain/dtos";
import { AuthRepositoryImpl } from "@/infraestructure/repositories";
import { AuthService } from "@/infraestructure/services";
import {
  type AppState,
  AuthStatus,
  onCheking,
  onLogin,
  onLogout,
  onResetCartDish,
  onResetChatMessages,
  onResetDish,
  onResetDishCategory,
  onResetOrderDish,
  onResetOrderDishItem,
  onResetPayment,
} from "@/infraestructure/store";
import {
  StorageKeys,
  clearStorage,
  routeRole,
  setStorage,
} from "@/presentation/utilities";
import { useMessageStore } from "./useMessageStore";
import { RoleEnum } from "@/domain/entities";
import { PrivateRoutes } from "@/presentation/routes";

const { TOKEN } = StorageKeys;

const authService = new AuthService();
const authRepositoryImpl = new AuthRepositoryImpl(authService);

export const useAuthStore = () => {
  const { startSetMessages } = useMessageStore();
  const { status, authenticatedUser } = useSelector(
    (state: AppState) => state.auth,
  );

  const dispatch = useDispatch();

  const startCheking = () => dispatch(onCheking());

  const startLoginGoogle = async (loginGoogleRequest: LoginGoogleRequest) => {
    loginGoogleRequest.validate();
    dispatch(onCheking());

    return await authRepositoryImpl
      .loginGoogle(loginGoogleRequest)
      .then(({ data }) => {
        dispatch(onLogin(data.user));
        setStorage(TOKEN, data.token);
        return data.user.role;
      })
      .catch((error) => {
        dispatch(onLogout());
        throw error;
      });
  };

  const startLogin = async (loginRequest: LoginRequest) => {
    dispatch(onCheking());

    return await authRepositoryImpl
      .login(loginRequest)
      .then(({ data }) => {
        dispatch(onLogin(data.user));
        setStorage(TOKEN, data.token);
        return data.user.role;
      })
      .catch((error) => {
        dispatch(onLogout());
        throw error;
      });
  };

  const startRegistering = async (registerRequest: RegisterRequest) => {
    dispatch(onCheking());

    await authRepositoryImpl
      .register(registerRequest)
      .then(({ message, status }) => startSetMessages([message], status))
      .catch((error) => {
        dispatch(onLogout());
        throw error;
      });
  };

  const startRevalidateToken = async () => {
    dispatch(onCheking());
    const token = localStorage.getItem(TOKEN);
    if (!token || token?.length < 5) return dispatch(onLogout());

    await authRepositoryImpl
      .revalidateToken()
      .then(({ data }) => {
        dispatch(onLogin(data));
      })
      .catch((error) => {
        dispatch(onLogout());
        throw error;
      });
  };

  const startLogout = () => {
    dispatch(onLogout());
    dispatch(onResetDish());
    dispatch(onResetDishCategory());
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
    isUser: authenticatedUser?.role === RoleEnum.ROLE_USER,
    isAdmin: authenticatedUser?.role === RoleEnum.ROLE_ADMIN,
    routeRole: PrivateRoutes[routeRole(authenticatedUser?.role)].toString(),
    isAuthenticate: status === AuthStatus.AUTHENTICATE,
    isLoading: status === AuthStatus.CHECKING,
    status,

    //* Methods
    startRegistering,
    startLoginGoogle,
    startLogin,
    startRevalidateToken,
    startCheking,
    startLogout,
  };
};
