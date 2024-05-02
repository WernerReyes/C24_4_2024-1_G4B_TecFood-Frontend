import { Route, Routes } from "react-router-dom";
import { ProgressSpinner } from "../components";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
export const RouterWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<ProgressSpinner />} />
    </Routes>
  );
};
