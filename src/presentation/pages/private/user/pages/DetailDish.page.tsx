import { DetailDish, MoreOptions } from "../components";
import { DishesLayout, UserLayout } from "../layout";

const DetailDishPage = () => {
  return (
    <UserLayout>
      <DishesLayout rowPerPage={[]}>
        <main className="m-10 xl:mx-20">
          <DetailDish />
          <hr className="my-10 dark:border-slate-700" />
          <h5 className="text-2xl font-semibold">You may also like:</h5>
          <MoreOptions />
        </main>
      </DishesLayout>
    </UserLayout>
  );
};

export default DetailDishPage;
