import clsx from "clsx";
import { OrderDishStatusEnum } from "@/domain/entities";
import { OrderDishItemState, OrderDishModel } from "@/model";
import {
  Card,
  Column,
  DataTable,
  Image,
  OverlayPanel,
  OverlayPanelRef,
  Tag
} from "@/presentation/components";
import { useOrderDishItemStore } from "@/presentation/hooks";
import { convertDateToShortString } from "@/presentation/utilities";
import { useEffect, useRef, useState } from "react";
import { FooterCardHistory } from "./FooterCardHistory";


interface Props extends OrderDishModel {
  icon: string;
  color: string;
  background: string;
}

export const CardHistory = ({
  background,
  status,
  id,
  invoiceReportUrl,
  date,
  total,
  icon,
  color,
  ...props
}: Props) => {
  const ref = useRef<OverlayPanelRef>(null);
  const { startLoadingOrderDishItemsByOrder, orderDishItems } =
    useOrderDishItemStore();
  const [orderDishId, setOrderDishId] = useState<number>(0);

  const handleShowDetails = (e: React.SyntheticEvent) => {
    ref.current?.toggle(e);
    setOrderDishId(id);
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
          ? "cursor-not-allowed bg-gray-200 opacity-50 dark:bg-gray-800"
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
        <FooterCardHistory
          handleShowDetails={handleShowDetails}
          status={status}
          id={id}
          {...props}
          date={date}
          total={total}
          invoiceReportUrl={invoiceReportUrl}
        />
      }
    >
      <p className="mb-4 flex items-center justify-center gap-x-3 text-4xl font-extrabold">
        <i className={clsx(color, "pi pi-wallet text-4xl  font-extrabold")}></i>
        <strong className={clsx(color, "text-4xl font-extrabold")}>
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
