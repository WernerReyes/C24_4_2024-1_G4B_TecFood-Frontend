import React, { useEffect, useState } from "react";
import { UpdateStatusRequest } from "@/domain/dtos";
import { StatusEnum } from "@/domain/entities/enums";
import { MultiStateCheckbox } from "@/presentation/core/components";

const OPTIONS = [
  { value: StatusEnum.PUBLISHED, icon: "pi pi-globe" },
  { value: StatusEnum.PRIVATE, icon: "pi pi-lock" },
];

type Props = {
  id: number;
  status: StatusEnum;
  startUpdatingStatus: (updateStatusRequest: UpdateStatusRequest) => void;
  isLoading: boolean;
  children: React.ReactNode;
  positionCheckbox?: "left" | "right";
  className?: string;
};

export const ActionsLayout = ({
  id,
  status,
  startUpdatingStatus,
  isLoading,
  children,
  positionCheckbox = "left",
  className = "flex items-center justify-evenly gap-x-4",
}: Props) => {
  const [value, setValue] = useState(StatusEnum.PUBLISHED);

  const handleUpdateStatus = (value: StatusEnum) => {
    const updateStatusRequest = new UpdateStatusRequest(id, value);
    startUpdatingStatus(updateStatusRequest);
  };

  useEffect(() => {
    setValue(status);
  }, [status]);

  return (
    <div className={className}>
      {children}
      <MultiStateCheckbox
        value={value}
        onChange={(e) => {
          setValue(e.value);
          handleUpdateStatus(e.value);
        }}
        options={OPTIONS}
        optionValue="value"
        defaultValue={status}
        tooltip={value}
        size={24}
        disabled={isLoading}
        tooltipOptions={{ position: positionCheckbox }}
        empty={false}
      />
    </div>
  );
};
