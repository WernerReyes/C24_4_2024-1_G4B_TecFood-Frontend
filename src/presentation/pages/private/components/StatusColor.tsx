import { StatusEnum } from "@/domain/entities/enums";
import { Tag } from "@/presentation/core/components";
import clsx from "clsx";

type Props = {
  status: StatusEnum;
};

export const StatusColor = ({ status }: Props) => {
  return (
    <Tag
      className={clsx({
        "bg-green-500/10 text-green-500": status === StatusEnum.PUBLISHED,
        "bg-red-500/10 text-red-500": status === StatusEnum.PRIVATE,
      })}
      icon={clsx({
        "pi pi-check": status === StatusEnum.PUBLISHED,
        "pi pi-lock": status === StatusEnum.PRIVATE,
      })}
      value={status}
    />
  );
};
