import { useEffect, useState } from "react";
import clsx from "clsx";
import type { OrderDishModel } from "@/model";
import {
  Paginator,
  SelectButton,
  type SelectButtonChangeEvent,
  Timeline,
} from "@/presentation/components";
import {
  useOrderDishStore,
  usePaginator,
  usePaymentStore,
  useWindowSize,
} from "@/presentation/hooks";
import { CardHistory } from "../components";
import { UserLayout } from "../layout";
import { GetOrderDishesByUserDto } from "@/domain/dtos";
import { OrderDishStatusEnum } from "@/domain/entities";

const COLOR_STATUS = {
  PENDING: "text-blue-500",
  PROCESSED: "text-yellow-500",
  COMPLETED: "text-green-500",
  CANCELLED: "text-red-500",
};

const BACKGROUND_STATUS = {
  PENDING: "bg-blue-500",
  PROCESSED: "bg-yellow-500",
  COMPLETED: "bg-green-500",
  CANCELLED: "bg-red-500",
};

const ICON_STATUS = {
  PENDING: "pi pi-clock",
  PROCESSED: "pi pi-cog",
  COMPLETED: "pi pi-check",
  CANCELLED: "pi pi-times-circle",
};

const ROW_PER_PAGE = [10, 20, 30];

interface TimelineEvent extends OrderDishModel {
  icon: string;
  color: string;
  background: string;
}

type Item = {
  name: string;
  value: OrderDishStatusEnum;
};

const items: Item[] = Object.keys(OrderDishStatusEnum).map((key) => ({
  name: key,
  value: OrderDishStatusEnum[key as keyof typeof OrderDishStatusEnum],
}));

const OrderHistoryPage = () => {
  const { width, md: SCREEN_MD } = useWindowSize();
  const { currentPage, limit, first, handlePageChange } = usePaginator(
    ROW_PER_PAGE[0],
  );
  const {
    orderDishes,
    startLoadingOrderDishesByUser,
    filters,
    status,
    startResetStatus,
    startFilterOrderDish,
    total,
  } = useOrderDishStore();
  const { payment } = usePaymentStore();
  const [orderDishesWithColorAndIcon, setOrderDishesWithColorAndIcon] =
    useState<TimelineEvent[]>([]);
  const [currentStatus, setCurrentStatus] = useState<
    { status: OrderDishStatusEnum }[]
  >(filters.status);

  useEffect(() => {
    const getOrderDishesByUserDto = new GetOrderDishesByUserDto(
      currentPage,
      limit,
      currentStatus,
    );
    startLoadingOrderDishesByUser(getOrderDishesByUserDto);
  }, [filters.status, status, currentStatus, currentPage, limit, payment]);

  useEffect(() => {
    setOrderDishesWithColorAndIcon(colorAndIconByStatus(orderDishes));
    startResetStatus();
  }, [orderDishes]);

  useEffect(() => {
    const filters = { status: currentStatus };
    startFilterOrderDish(filters);
  }, [currentStatus]);

  return (
    <UserLayout>
      <section className="xl:mx-30 mt-10 md:mx-10 lg:mx-20">
        <SelectButton
          value={currentStatus.map((item) => item.status)}
          className="mx-5 mb-5 flex items-center justify-center"
          onChange={(e: SelectButtonChangeEvent) =>
            setCurrentStatus(
              e.value.map((item: OrderDishStatusEnum) => ({ status: item })),
            )
          }
          optionLabel="name"
          options={items}
          multiple
        />
        <Paginator
          first={first}
          rows={limit}
          totalRecords={total}
          onPageChange={handlePageChange}
          rowsPerPage={ROW_PER_PAGE}
          className={clsx(
            !orderDishes.length && "hidden",
            "mt-auto flex justify-end bg-transparent",
          )}
        />

        {orderDishes.length ? (
          <Timeline
            value={orderDishesWithColorAndIcon}
            className="xl:mx-30 md:mx-10 lg:mx-20"
            align={width > SCREEN_MD ? "alternate" : "left"}
            marker={(item) => <CustomizedMarker item={item} />}
            content={(item) => <CardHistory {...item} />}
          />
        ) : (
          <div className="flex h-96 items-center justify-center">
            <p className="text-2xl text-gray-500 dark:text-gray-400">
              No orders found
            </p>
          </div>
        )}

        <Paginator
          first={first}
          rows={limit}
          totalRecords={total}
          onPageChange={handlePageChange}
          rowsPerPage={ROW_PER_PAGE}
          className={clsx(
            !orderDishes.length && "hidden",
            "mt-auto flex justify-end bg-transparent",
          )}
        />
      </section>
    </UserLayout>
  );
};

export default OrderHistoryPage;

const colorAndIconByStatus = (orderDish: OrderDishModel[]): TimelineEvent[] => {
  return orderDish.map((item) => ({
    ...item,
    color: COLOR_STATUS[item.status],
    background: BACKGROUND_STATUS[item.status],
    icon: ICON_STATUS[item.status],
  }));
};

const CustomizedMarker = ({ item }: { item: TimelineEvent }) => {
  return (
    <span
      className={clsx(
        item.color,
        "w-2rem h-2rem align-items-center justify-content-center border-circle z-1 shadow-1 flex rounded-full p-2",
      )}
    >
      <i className={item.icon}></i>
    </span>
  );
};
