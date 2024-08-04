import { DetailDish, MoreOptions } from "./components";
import { useAuthStore, useDishStore } from "@/presentation/hooks";
import { DishesLayout } from "../../layout";
import { Layout } from "../layout";
import type { DishModel } from "@/model";

const DetailDishPage = () => {
  const { isAdmin, isUser } = useAuthStore();
  const { dishes } = useDishStore();
  return (
    <Layout>
      {isAdmin && <MainContent dishes={dishes} />}
      {isUser && (
        <DishesLayout rowPerPage={[]}>
          <MainContent dishes={dishes} />
        </DishesLayout>
      )}
    </Layout>
  );
};

export default DetailDishPage;

const MainContent = ({ dishes }: { dishes: DishModel[] }) => (
  <main className="m-10 xl:mx-14">
    <DetailDish />
    {dishes.length > 1 && (
      <>
        <hr className="my-10 dark:border-slate-700" />
        <h5 className="text-2xl font-semibold">You may also like:</h5>
        <MoreOptions />
      </>
    )}
  </main>
);
