import { DetailDish, MoreOptions } from "../components";
import { DishesLayout, UserLayout } from "../layout";

const DetailDishPage = () => {
  return (
    <UserLayout>
      <DishesLayout rowPerPage={[]}>
      <main className="m-10 xl:mx-20">
        <DetailDish />
        <h5 className="my-10 text-2xl font-semibold">You may also like:</h5>
          <MoreOptions />
      </main>
      </DishesLayout>
    </UserLayout>
  );
};

export default DetailDishPage;
