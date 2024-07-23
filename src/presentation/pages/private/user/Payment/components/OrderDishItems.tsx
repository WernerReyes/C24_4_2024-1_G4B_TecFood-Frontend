import { useOrderDishItemStore, useOrderDishStore } from "@/presentation/hooks";
import { OrderSummaryLayout } from "../../layout";
import { useEffect, useState } from "react";
import { OrderList } from "primereact/orderlist";
import { OrderDishItemModel } from "@/model";

type Props = {
  orderDishId: number;
};

export const OrderDishItems = ({ orderDishId }: Props) => {
  const { startLoadingOrderDishItemsByOrder, orderDishItems } =
    useOrderDishItemStore();
    const { orderDish, startGetOrderDishById } = useOrderDishStore();

    const [dishItems, setDishItems] = useState<OrderDishItemModel[]>([]);

  useEffect(() => {
    startLoadingOrderDishItemsByOrder(Number(orderDishId));
    startGetOrderDishById(Number(orderDishId));
  }, [orderDishId]);

  useEffect(() => {
    setDishItems(orderDishItems);
  }, [orderDishItems]);


  return (
    <OrderSummaryLayout total={orderDish.total} subTotal={orderDish.total} position="top">
      <OrderList dataKey="id" value={dishItems} onChange={(e) => setDishItems(e.value)} itemTemplate={itemTemplate}></OrderList>
    </OrderSummaryLayout>
  );
};


const itemTemplate = (item: OrderDishItemModel) => {
    return (
        <div className="flex flex-wrap p-2 align-items-center gap-3">
            <img className="w-20 shadow-2 flex-shrink-0 border-round" src={item.dish.img} alt={item.dish.name} />
            <div className="flex-1 gap-2 xl:mr-8">
                <span className="font-bold">{item.dish.name}</span>
                <div className="flex items-center gap-2">
                    <i className="pi pi-tag text-sm"></i>
                    <span>{item.dish.category.name}</span>
                </div>
            </div>
            <span className="font-bold text-900">S/.{item.price}</span>
        </div>
    );
};