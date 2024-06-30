import { RoleEnum } from "@/domain/entities";
import { Route, Routes } from "react-router-dom";
import { BreadCrumb } from "../components";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
export const RouterWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<BreadCrumb role={RoleEnum.ROLE_USER} scrollId="" />} />
    </Routes>
  );
};
