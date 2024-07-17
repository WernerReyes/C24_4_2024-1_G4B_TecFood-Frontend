import { UpdateOrderDishStatusDto } from "@/domain/dtos";
import { OrderDishStatusEnum } from "@/domain/entities";
import type { OrderDishModel } from "@/model";
import {
    Button,
    DowloadFile,
    Link
} from "@/presentation/components";
import { useOrderDishStore } from "@/presentation/hooks";
import { PrivateRoutes } from "@/presentation/routes";

const {
  USER,
  user: { PAYMENT },
} = PrivateRoutes;

interface Props extends OrderDishModel {
  handleShowDetails: (e: React.SyntheticEvent) => void;
}

export const FooterCardHistory = ({
  status,
  id,
  handleShowDetails,
  invoiceReportUrl,
}: Props) => {
  const { startUpdateOrderDishStatus } = useOrderDishStore();
  

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


  if(invoiceReportUrl) return (
    <div className="flex items-center justify-center gap-x-4">
      <DowloadFile
        icon="pi pi-download"
        size="large"
        url={invoiceReportUrl}
        fileName={`invoice-${id}`}
        className="w-14 h-14 rounded-full text-white dark:text-black"
      />
    </div>
  );
  

  return (
    <div className="flex items-center justify-center gap-x-4">
      <Button
        onClick={handleShowDetails}
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
      {invoiceReportUrl && (
        <DowloadFile
          icon="pi pi-download"
          url={invoiceReportUrl}
          fileName={`invoice-${id}`}
          className="w-10 rounded-full text-white dark:text-black"
        />
      )}

      {status === OrderDishStatusEnum.PROCESSED && (
        <Link
          unstyled
          type="router"
          to={`${USER}/${PAYMENT}/${id}`}
          label="Pay"
          className="rounded-md bg-primary px-8 py-2 font-bold text-white dark:text-black"
        ></Link>
      )}
    </div>
  );
};
