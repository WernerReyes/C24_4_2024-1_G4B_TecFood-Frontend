import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUser } from "@/domain/use-cases/user";
import {
  AppState,
  onLoadUsers,
  onUpdateUser,
  onLoadingUsers,
} from "@/infraestructure/store";
import { userRepositoryImpl } from "@/infraestructure/repositories";
import { UpdateUser } from "@/model";

export const useUser = () => {
  const dispatch = useDispatch();

  const { user, users, isLoading } = useSelector(
    (state: AppState) => state.user,
  );

  const startLoadingUsers = () => {
    dispatch(onLoadingUsers());

    getUsers(userRepositoryImpl)
      .execute()
      .then((users) => dispatch(onLoadUsers(users)))
      .catch((error) => error);
  };

  const startUpdatingUser = (user: UpdateUser) => {
    dispatch(onLoadingUsers());

    updateUser(userRepositoryImpl)
      .execute(user)
      .then((user) => {
        dispatch(onUpdateUser(user));
        startLoadingUsers();
      })
      .catch((error) => error);
  };

  return {
    //* Attributes
    user,
    users,
    isLoading,

    //* Methods
    startLoadingUsers,
    startUpdatingUser,
  };
};
