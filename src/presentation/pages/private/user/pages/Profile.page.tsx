import { BreadCrumb } from "@/presentation/components";
import { Header } from "../components";
import { RoleEnum } from "@/domain/entities";

export const Profile = () => {
  return (
    <>
      <Header />
      <BreadCrumb role={RoleEnum.ROLE_USER} />
    </>
  );
};

export default Profile;
