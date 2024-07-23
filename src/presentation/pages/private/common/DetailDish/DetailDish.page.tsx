import { DetailDish, MoreOptions } from "./components";
import { useAuthStore } from "@/presentation/hooks";
import { DishesLayout } from "../../layout";
import { Layout } from "../layout";

const DetailDishPage = () => {
  const { isAdmin, isUser } = useAuthStore();
  return (
    <Layout>
      {isAdmin && <MainContent />}
      {isUser && (
        <DishesLayout rowPerPage={[]}>
          <MainContent />
        </DishesLayout>
      )}
    </Layout>
  );
};

export default DetailDishPage;

const MainContent = () => (
  <main className="m-10 xl:mx-20">
    <DetailDish />
    <hr className="my-10 dark:border-slate-700" />
    <h5 className="text-2xl font-semibold">You may also like:</h5>
    <MoreOptions />
  </main>
);
