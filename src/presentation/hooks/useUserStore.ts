import { UpdateUserDto, UploadProfileDto } from "@/domain/dtos/user";
import { UpdateUser, UploadProfile } from "@/domain/use-cases";
import { UserRepositoryImpl } from "@/infraestructure/repositories";
import { UserService } from "@/infraestructure/services";
import {
  AppState,
  TypeMessage,
  onLoadProfile,
  onLoadingUsers,
} from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";
import { useMessage } from "./useMessage";

const userService = new UserService();
const userRepositoryImpl = new UserRepositoryImpl(userService);

export const useUserStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessage();

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

    await new UpdateUser(userRepositoryImpl)
      .execute(updateUserDto)
      .then(({ message }) => {
        startSetMessages([message], TypeMessage.SUCCESS);
      })
      .catch((error) => error);
  };

  const startUploadingProfile = async (
    uploadProfileDto: [UploadProfileDto?, string[]?],
  ) => {
    const [uploadProfileDtoValidated, errors] = uploadProfileDto;
    if (errors) return startSetMessages(errors, TypeMessage.ERROR);
    dispatch(onLoadingUsers());

    await new UploadProfile(userRepositoryImpl)
      .execute(uploadProfileDtoValidated!)
      .then(({ profileUrl, message }) => {
        dispatch(onLoadProfile(profileUrl));
        startSetMessages([message], TypeMessage.SUCCESS);
      })
      .catch((error) => error);
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
