import type {
  UpdateUserDto,
  UploadImageDto
} from "@/domain/dtos";
import { UserRepositoryImpl } from "@/infraestructure/repositories";
import { UserService } from "@/infraestructure/services";
import {
  AppState,
  onLoadProfile,
  onLoadingUsers,
} from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";
import { useMessageStore } from "./useMessageStore";

const userService = new UserService();
const userRepositoryImpl = new UserRepositoryImpl(userService);

export const useUserStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages, typeSuccess } = useMessageStore();

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

  const startUpdatingUser = async (updateUserDto: UpdateUserDto) => {
    dispatch(onLoadingUsers());

    await userRepositoryImpl
      .update(updateUserDto)
      .then(({ message }) => {
        startSetMessages([message], typeSuccess);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUploadingProfile = async (uploadImageDto: UploadImageDto) => {
    uploadImageDto.validate();

    dispatch(onLoadingUsers());

    await userRepositoryImpl
      .uploadProfile(uploadImageDto)
      .then(({ profileUrl, message }) => {
        dispatch(onLoadProfile(profileUrl));
        startSetMessages([message], typeSuccess);
      })
      .catch((error) => {
        dispatch(onLoadProfile(""));
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
