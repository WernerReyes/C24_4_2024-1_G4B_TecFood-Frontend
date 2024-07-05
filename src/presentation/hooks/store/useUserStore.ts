import { useDispatch, useSelector } from "react-redux";
import type { UpdateUserDto, UploadProfileDto } from "@/domain/dtos";
import { UserRepositoryImpl } from "@/infraestructure/repositories";
import { UserService } from "@/infraestructure/services";
import {
  AppState,
  onLoadProfile,
  onLoadingUsers,
} from "@/infraestructure/store";
import { useMessageStore } from "./useMessageStore";

const userService = new UserService();
const userRepositoryImpl = new UserRepositoryImpl(userService);

export const useUserStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages, typeError, typeSuccess } = useMessageStore();

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
    userRepositoryImpl
      .update(updateUserDto)
      .then(({ message }) => {
        startSetMessages([message], typeSuccess);
      })
      .catch((error) => {
        throw error;
      });
  };

  const startUploadingProfile = async (
    uploadProfileDto: [UploadProfileDto?, string[]?],
  ) => {
    dispatch(onLoadingUsers());
    const [uploadProfileDtoValidated, errors] = uploadProfileDto;
    if (errors) return startSetMessages(errors, typeError);
    userRepositoryImpl
      .uploadProfile(uploadProfileDtoValidated!)
      .then(({ profileUrl, message }) => {
        dispatch(onLoadProfile(profileUrl));
        startSetMessages([message], typeSuccess);
      })
      .catch((error) => {
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
