import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, InputText } from "@/presentation/core/components";
import { UploadDishImages } from "../../components";
import {
  CreateDishCategoryRequest,
  DishCategoryRequest,
  UpdateDishCategoryImageRequest,
  UpdateDishCategoryRequest,
  UploadImageRequest,
} from "@/domain/dtos";
import { useDishCategoryStore, useMessageStore } from "@/presentation/hooks";
import { dishCategoryEmptyState } from "@/model";

type Props = {
  visible: boolean;
  onHide: () => void;
};

export const CategoryDialog = ({ visible, onHide }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DishCategoryRequest>({
    resolver: zodResolver(DishCategoryRequest.schema),
  });
  const { startSetMessagesError } = useMessageStore();
  const {
    startCreatingDishCategory,
    startLoadingDishCategory,
    startUpdatingDishCategoryImage,
    startUpdatingDishCategory,
    dishCategory,
  } = useDishCategoryStore();
  const [file, setFile] = useState<{
    file: File;
    isDeleted: boolean;
  } | null>(null);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  const handleUpdateImage = () => {
    if (!file) return startSetMessagesError(["Image is required"]);

    const updateDishCategoryImageRequest = new UpdateDishCategoryImageRequest(
      dishCategory.id,
      file.file,
    );
    startUpdatingDishCategoryImage(updateDishCategoryImageRequest)
      .then(() => {
        setUploadedSuccess(true);
        onHide();
      })
      .catch(() => {
        setUploadedSuccess(true);
        onHide();
      });
  };

  const handleSaveCategory = (dishCategoryRequest: DishCategoryRequest) => {
    if (dishCategory.id) {
      const updateDishCategoryRequest = new UpdateDishCategoryRequest(
        dishCategory.id,
        dishCategoryRequest.name,
      );
      startUpdatingDishCategory(updateDishCategoryRequest).then(() => {
        onHide();
        startLoadingDishCategory(dishCategoryEmptyState);
      });
    } else {
      if (!file) return startSetMessagesError(["Image is required"]);

      const createDishCategoryRequest = new CreateDishCategoryRequest(
        dishCategoryRequest.name,
      );
      const uploadImageRequest = new UploadImageRequest(file.file);
      startCreatingDishCategory(
        createDishCategoryRequest,
        uploadImageRequest,
      ).then(() => {
        setUploadedSuccess(true);
        onHide();
      });
    }
  };

  useEffect(() => {
    if (dishCategory.id) {
      reset({
        name: dishCategory.name,
      });
    } else
      reset({
        name: "",
      });
  }, [dishCategory]);

  useEffect(() => {
    if (dishCategory.id) {
      handleUpdateImage();
    }
  }, [file]);

  return (
    <Dialog
      visible={visible}
      onHide={() => {
        if (!visible) return;
        onHide();
        startLoadingDishCategory(dishCategoryEmptyState);
      }}
      className="h-[75%] w-[75%] max-w-screen-md"
    >
      <div className="flex justify-center">
        <UploadDishImages
          image={
            dishCategory.id
              ? {
                  id: dishCategory.id,
                  url: dishCategory.imageUrl,
                }
              : undefined
          }
          size="medium"
          setFile={setFile}
          uploadedSuccess={uploadedSuccess}
        />
      </div>
      <form
        className="mt-4 flex flex-col space-y-4 md:mx-20"
        onSubmit={handleSubmit(handleSaveCategory)}
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
