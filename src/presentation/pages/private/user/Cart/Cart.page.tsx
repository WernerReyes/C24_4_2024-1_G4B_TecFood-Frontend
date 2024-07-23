import { useCartStore } from "@/presentation/hooks";
import { OrderSummary, ShoppingCart } from "./components";
import { DishesLayout } from "../../layout";
import { UserLayout } from "../layout";

const CartPage = () => {
  const { cart, startResetCartDish } = useCartStore();

  return (
    <UserLayout>
      <DishesLayout rowPerPage={[]}>
        <section className="mx-10 mt-10 grid grid-cols-1 gap-x-10 md:mx-20 lg:grid-cols-6">
          <div className="col-span-1 lg:col-span-4">
            <ShoppingCart cart={cart} />
          </div>
          <div className="col-span-1 mt-8 lg:col-span-2 lg:mt-0">
            <OrderSummary cart={cart} startResetCartDish={startResetCartDish} />
          </div>
        </section>
      </DishesLayout>
    </UserLayout>
  );
};

export default CartPage;
