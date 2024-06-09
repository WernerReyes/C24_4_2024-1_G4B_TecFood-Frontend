import { CartState } from "@/model";
import { useCart, useCartStore } from "@/presentation/hooks";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { AddAndRemoveDish } from "../components";
import { DishesLayout, UserLayout } from "../layout";
import { Image } from "@/presentation/components";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <UserLayout>
      <DishesLayout rowPerPage={[]}>
        <section className="mx-10 mt-10 grid grid-cols-1 gap-x-10 md:mx-20 lg:grid-cols-6">
          <div className="col-span-1 lg:col-span-4">
            <DataTable
              emptyMessage="Your cart is empty"
              tableClassName="min-w-[40rem]"
              pt={{
                header: { className: "border-b-2 dark:border-slate-700" },
                headerRow: { className: "border-b-2 dark:border-slate-700" },
                bodyRow: { className: "border-b-2 dark:border-slate-700" },
              }}
              className="rounded-lg border-2 dark:border-slate-700"
              value={cart}
              header={<h6 className="text-2xl font-bold">Shopping Cart</h6>}
            >
              <Column
                header="Products"
                className="min-w-56 max-w-72"
                body={(cartItem: CartState) => {
                  const { handleResetCart } = useCart(
                    cartItem.dish.id,
                    cartItem.quantity,
                    "table",
                  );
                  return (
                    <div className="flex">
                      <div className="flex max-w-5 items-center">
                        <i
                          onClick={handleResetCart}
                          className="pi pi-times-circle cursor-pointer text-center text-xl"
                        ></i>
                      </div>
                      <div className="ml-3 grid grid-cols-4 items-center gap-x-3">
                        <div className="col-span-2 w-full">
                          <Image
                            src={cartItem.dish.img}
                            alt={cartItem.dish.name}
                            imageClassName="rounded-lg w-full bg-red-500 h-20 object-cover"
                          />
                        </div>

                        <h6 className="text-lg font-bold">
                          {cartItem.dish.name}
                        </h6>
                      </div>
                    </div>
                  );
                }}
              ></Column>
              <Column
                header="Price"
                body={(cartItem: CartState) => `S/.${cartItem.dish.price}`}
              ></Column>
              <Column
                header="Quantity"
                body={(cartItem: CartState) => {
                  const {
                    isAddToCart,
                    handleAddToCart,
                    quantityMemory,
                    handleRemoveToCart,
                  } = useCart(cartItem.dish.id, cartItem.quantity, "table");

                  return (
                    <AddAndRemoveDish
                      isAddToCart={isAddToCart}
                      handleAddToCart={handleAddToCart}
                      quantityMemory={quantityMemory}
                      handleRemoveToCart={handleRemoveToCart}
                    />
                  );
                }}
              ></Column>
              <Column
                header="Sub-Total"
                body={(cartItem: CartState) =>
                  `S/.${cartItem.dish.price * cartItem.quantity}`
                }
              ></Column>
            </DataTable>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <h1 className="text-4xl font-bold">Cart</h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt, nunc vel aliquam.
            </p>
          </div>
        </section>
      </DishesLayout>
    </UserLayout>
  );
};

export default CartPage;
