import type { UpdateUserRequest, UploadImageRequest } from "@/domain/dtos";
import { UserRepositoryImpl } from "@/infraestructure/repositories";
import { UserService } from "@/infraestructure/services";
import {
  type AppState,
  onLoadUser,
  onLoadingUsers,
} from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";
import { useMessageStore } from "./useMessageStore";

const userService = new UserService();
const userRepositoryImpl = new UserRepositoryImpl(userService);

export const useUserStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessageStore();

  const { user, users, isLoading } = useSelector(
    (state: AppState) => state.user,
  );

  // const startLoadingUsers = () => {
  //   dispatch(onLoadingUsers());

  //   getUsers(userRepositoryImpl)
  //     .execute()
  //     .then((users) => dispatch(onLoadUsers(users)))
  //     .catch((error) => error);
  // };

  const startUpdatingUser = async (updateUserRequest: UpdateUserRequest) => {
    dispatch(onLoadingUsers());

    await userRepositoryImpl
      .update(updateUserRequest)
      .then(({ message, status, data }) => {
        startSetMessages([message], status);
        dispatch(onLoadUser(data));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUploadingProfile = async (uploadImageRequest: UploadImageRequest) => {
    uploadImageRequest.validate();

    dispatch(onLoadingUsers());

    await userRepositoryImpl
      .uploadProfile(uploadImageRequest)
      .then(({ data, message, status }) => {
        dispatch(
          onLoadUser({
            ...user,
            img: data,
          }),
        );
        startSetMessages([message], status);
      })
      .catch((error) => {
        dispatch(onLoadUser(user));
        throw error;
      });
  };

  return {
    //* Attributes
    user,
    users,
    isLoading,

    //* Methods
    startUpdatingUser,
    startUploadingProfile,
    // startLoadingUsers,
  };
};
