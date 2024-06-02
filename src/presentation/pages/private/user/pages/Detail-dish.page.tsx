import { DetailDish, MoreOptions } from "../components";
import { UserLayout } from "../layout";

const DetailDishPage = () => {
  return (
    <UserLayout>
      <main className="m-10 xl:mx-20">
        <DetailDish />
        <h5 className="my-10 text-2xl font-semibold">You may also like:</h5>
          <MoreOptions />
      </main>
    </UserLayout>
  );
};

export default DetailDishPage;
