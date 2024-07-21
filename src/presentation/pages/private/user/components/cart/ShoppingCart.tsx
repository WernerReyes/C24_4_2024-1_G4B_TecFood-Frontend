import { type CartDishModel } from "@/model";
import { Column, DataTable, Image, Link } from "@/presentation/components";
import { useCart } from "@/presentation/hooks";
import { AddAndRemoveDish } from "../";
import { PrivateRoutes } from "@/presentation/routes";

type Props = {
  cart: CartDishModel[];
};

const {
  USER,
  user: { DISHES },
} = PrivateRoutes;

export const ShoppingCart = ({ cart }: Props) => {
  return (
    <DataTable
      emptyMessage="Your cart is empty"
      tableClassName="min-w-[40rem]"
      className="rounded-lg border-2 dark:border-slate-700"
      value={cart}
      footer={
        <Link
          className="rounded-md border-2 border-primary text-primary"
          to={`${USER}/${DISHES}`}
        >
          Shop More
        </Link>
      }
      header={<h6 className="text-xl dark:text-white">Shopping Cart</h6>}
    >
      <Column
        header="Products"
        className="min-w-56 max-w-72"
        body={(cartItem: CartDishModel) => (
          <ProductTemplate cartItem={cartItem} />
        )}
      ></Column>
      <Column
        header="Price"
        body={(cartItem: CartDishModel) => `S/.${cartItem.dish.price}`}
      ></Column>
      <Column
        header="Quantity"
        body={(cartItem: CartDishModel) => (
          <QuantityTemplate cartItem={cartItem} />
        )}
      ></Column>
      <Column
        header="Sub-Total"
        body={(cartItem: CartDishModel) =>
          `S/.${(cartItem.dish.price * cartItem.quantity).toFixed(2)}`
        }
      ></Column>
    </DataTable>
  );
};

const ProductTemplate = ({ cartItem }: { cartItem: CartDishModel }) => {
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

        <h6 className="text-lg font-bold">{cartItem.dish.name}</h6>
      </div>
    </div>
  );
};

const QuantityTemplate = ({ cartItem }: { cartItem: CartDishModel }) => {
  const { isAddToCart, handleAddToCart, quantityMemory, handleRemoveToCart } =
    useCart(cartItem.dish.id, cartItem.quantity, "table");

  return (
    <AddAndRemoveDish
      isAddToCart={isAddToCart}
      handleAddToCart={handleAddToCart}
      quantityMemory={quantityMemory}
      handleRemoveToCart={handleRemoveToCart}
      stock={cartItem.dish.stock}
    />
  );
};
