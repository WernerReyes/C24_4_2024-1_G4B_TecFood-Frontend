import { UpdateUserDto, UploadProfileDto } from "@/domain/dtos/user";
import { UpdateUser, UploadProfile } from "@/domain/use-cases";
import { UserRepositoryImpl } from "@/infraestructure/repositories";
import { UserService } from "@/infraestructure/services";
import {
  AppState,
  onLoadProfile,
  onLoadingUsers,
} from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";
import { useMessage } from "../";

const userService = new UserService();
const userRepositoryImpl = new UserRepositoryImpl(userService);

export const useUserStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages, typeError, typeSuccess } = useMessage();

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
        startSetMessages([message], typeSuccess);
      })
      .catch((error) => error);
  };

  const startUploadingProfile = async (
    uploadProfileDto: [UploadProfileDto?, string[]?],
  ) => {
    const [uploadProfileDtoValidated, errors] = uploadProfileDto;
    if (errors) return startSetMessages(errors, typeError);
    dispatch(onLoadingUsers());

    await new UploadProfile(userRepositoryImpl)
      .execute(uploadProfileDtoValidated!)
      .then(({ profileUrl, message }) => {
        dispatch(onLoadProfile(profileUrl));
        startSetMessages([message], typeSuccess);
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
