import { Button, Dialog, InputText } from "@/presentation/core/components";
import { UploadDishImages } from "../../components";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateDishCategoryDto,
  DishCategoryDto,
  UploadImageDto,
} from "@/domain/dtos";
import { useDishCategoryStore, useMessageStore } from "@/presentation/hooks";

type Props = {
  visible: boolean;
  onHide: () => void;
};

export const AddCategoryDialog = ({ visible, onHide }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DishCategoryDto>({
    resolver: zodResolver(DishCategoryDto.schema),
  });
  const { startSetErrorMessages } = useMessageStore();
  const { startCreatingDishCategory } = useDishCategoryStore();
  const [file, setFile] = useState<{
    file: File;
    isDeleted: boolean;
  } | null>(null);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  const handleCreateCategory = (dishCategoryDto: DishCategoryDto) => {
    if (!file) return startSetErrorMessages(["Image is required"]);

    const createDishCategoryDto = new CreateDishCategoryDto(
      dishCategoryDto.name,
    );
    const uploadImageDto = new UploadImageDto(file.file);
    startCreatingDishCategory(createDishCategoryDto, uploadImageDto).then(
      () => {
        setUploadedSuccess(true);
        onHide();
      },
    );
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      className="h-[75%] w-[75%] max-w-screen-md"
    >
      <div className="flex justify-center">
        <UploadDishImages
          size="medium"
          setFile={setFile}
          uploadedSuccess={uploadedSuccess}
        />
      </div>
      <form
        className="mx-20 mt-4 flex flex-col space-y-4"
        onSubmit={handleSubmit(handleCreateCategory)}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <InputText
              {...field}
              type="text"
              label="Name"
              placeholder="Enter category name"
              error={!!error?.message}
              smallDescription={error?.message}
              className="border-2 border-primary bg-transparent py-3 text-sm "
            />
          )}
        />
        <Button
          type="submit"
          icon="pi pi-save"
          label="Save"
          className="mt-5 w-full rounded-md dark:text-slate-100"
          disabled={Object.keys(errors).length > 0}
        />
      </form>
    </Dialog>
  );
};
