import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  Button,
  Card,
  Column,
  DataTable,
  Image,
  OverlayPanel,
  OverlayPanelRef,
  Tag,
} from "@/presentation/components";
import { useOrderDishItemStore, useOrderDishStore } from "@/presentation/hooks";
import { OrderDishItemState, OrderDishState } from "@/model";
import { convertDateToShortString } from "@/presentation/utilities";
import { OrderDishStatusEnum } from "@/domain/entities";
import { UpdateOrderDishStatusDto } from "@/domain/dtos";

interface Props extends OrderDishState {
  icon: string;
  color: string;
  background: string;
}

export const CardHistory = ({
  background,
  status,
  id,
  date,
  total,
  color,
}: Props) => {
  const ref = useRef<OverlayPanelRef>(null);
  const { startUpdateOrderDishStatus } = useOrderDishStore();
  const { startLoadingOrderDishItemsByOrder, orderDishItems } =
    useOrderDishItemStore();
  const [orderDishId, setOrderDishId] = useState<number>(0);

  const handleCancelOrder = () => {
    const updateOrderDishStatusDto = UpdateOrderDishStatusDto.create({
      orderDishId: id,
      status: OrderDishStatusEnum.CANCELLED,
    });

    startUpdateOrderDishStatus(
      updateOrderDishStatusDto,
      "Order canceled successfully",
    );
  };

  useEffect(() => {
    if (orderDishId > 0) {
      startLoadingOrderDishItemsByOrder(orderDishId);
    }
  }, [orderDishId]);

  return (
    <Card
      className={clsx(
        status === OrderDishStatusEnum.CANCELLED
          ? "cursor-not-allowed opacity-50 bg-gray-200 dark:bg-gray-800"
          : "",
        "my-3 rounded-lg p-5 shadow-lg md:my-0",
      )}
      title={
        <div className="flex items-center justify-between">
          <Tag className={background} value={status} />
          <span className="text-lg font-bold">Order {id}</span>
        </div>
      }
      subTitle={
        <small className="text-end text-gray-500">
          {convertDateToShortString(date)}
        </small>
      }
      footer={
        <div className="flex items-center justify-center gap-x-4">
          <Button
            onClick={(e) => {
              ref.current?.toggle(e);
              setOrderDishId(id);
            }}
            label="Details"
            className="rounded-md text-white dark:text-black sm:w-24  lg:w-40 xl:w-48"
          ></Button>
          {status === OrderDishStatusEnum.PENDING && (
            <Button
              label="Cancel"
              className="rounded-md text-white dark:text-black sm:w-24 lg:w-40 xl:w-48"
              onClick={handleCancelOrder}
            ></Button>
          )}
        </div>
      }
    >
      <p className="mb-4 flex items-center justify-center gap-x-3 text-4xl font-extrabold">
        <i className={clsx(color, "pi pi-wallet text-4xl  font-extrabold")}></i>
        <strong className={clsx(color, "text-4xl font-extrabold")}>
          {" "}
          S/.{total}
        </strong>
      </p>
      <OverlayPanel
        ref={ref}
        showCloseIcon
        closeOnEscape
        onHide={() => setOrderDishId(0)}
        dismissable
      >
        <DataTable value={orderDishItems}>
          <Column field="dish.name" header="Dish"></Column>
          <Column
            header="Image"
            body={(rowData: OrderDishItemState) => (
              <Image
                src={rowData.dish.img}
                alt={rowData.dish.name}
                imageClassName="w-20"
              />
            )}
          ></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column
            header="Price"
            body={(rowData: OrderDishItemState) => (
              <span>S/.{rowData.dish.price}</span>
            )}
          ></Column>
        </DataTable>
      </OverlayPanel>
    </Card>
  );
};
