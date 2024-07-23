import { useAuthStore } from "@/presentation/hooks";
import { AdminLayout } from "../../admin/layout";
import { UserLayout } from "../../user/layout";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { isAdmin, isUser } = useAuthStore();
  return (
    <>
      {isAdmin && <AdminLayout>{children}</AdminLayout>}
      {isUser && <UserLayout>{children}</UserLayout>}
    </>
  );
};
