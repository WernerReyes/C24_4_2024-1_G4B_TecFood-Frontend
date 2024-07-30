import { useEffect, useState } from "react";
import { UpdateStatusRequest } from "@/domain/dtos";
import { StatusEnum } from "@/domain/entities/enums";
import { DishCategoryModel } from "@/model";
import { Button, MultiStateCheckbox } from "@/presentation/core/components";
import { useDishCategoryStore } from "@/presentation/hooks";


const OPTIONS = [
  { value: StatusEnum.PUBLISHED, icon: "pi pi-globe" },
  { value: StatusEnum.PRIVATE, icon: "pi pi-lock" },
];

type Props = {
  category: DishCategoryModel;
  setShowCategoryDialog: (value: boolean) => void;
  setConfirmDialog: (value: {
    visible: boolean;
    message: string;
    dishCategoryId?: number;
  }) => void;
};

export const CategoryActions = ({
  category,
  setShowCategoryDialog,
  setConfirmDialog,
}: Props) => {
  const {
    startLoadingDishCategory,
    startUpdatingDishCategoryStatus,
    isLoading,
  } = useDishCategoryStore();
  const [value, setValue] = useState(StatusEnum.PUBLISHED);

  const handleUpdateStatus = (value: StatusEnum) => {
    const updateStatusRequest = new UpdateStatusRequest(category.id, value);
    startUpdatingDishCategoryStatus(updateStatusRequest);
  };

  useEffect(() => {
    setValue(category.status);
  }, [category.status]);

  return (
    <div className="flex items-center justify-evenly gap-x-4">
      <Button
        unstyled
        icon="pi pi-pencil"
        rounded
        outlined
        onClick={() => {
          startLoadingDishCategory(category);
          setShowCategoryDialog(true);
        }}
      />

      {!category.isUsed && (
        <Button
          unstyled
          icon="pi pi-trash"
          rounded
          outlined
          className="disabled:opacity-50"
          disabled={isLoading}
          onClick={() =>
            setConfirmDialog({
              visible: true,
              message: `Are you sure you want to delete "${category.name}"?`,
              dishCategoryId: category.id,
            })
          }
        />
      )}

      <MultiStateCheckbox
        value={value}
        onChange={(e) => {
          setValue(e.value);
          handleUpdateStatus(e.value);
        }}
        options={OPTIONS}
        optionValue="value"
        defaultValue={category.status}
        tooltip={value}
        disabled={isLoading}
        tooltipOptions={{
          position: "left",
        }}
        empty={false}
      />
    </div>
  );
};
