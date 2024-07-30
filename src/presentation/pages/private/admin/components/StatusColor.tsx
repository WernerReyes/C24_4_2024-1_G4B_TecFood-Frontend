import { StatusEnum } from "@/domain/entities/enums";
import clsx from "clsx";


type Props = {
  status: StatusEnum;
};

export const StatusColor = ({ status }: Props) => {
  return (
    <span
      className={clsx(
        "rounded-full p-4 py-2 text-center text-xs font-bold",
        status === StatusEnum.PUBLISHED && "bg-green-500/10 text-green-500",
        status === StatusEnum.PRIVATE && "bg-red-500/10 text-red-500",
      )}
    >
      {status}
    </span>
  );
};
