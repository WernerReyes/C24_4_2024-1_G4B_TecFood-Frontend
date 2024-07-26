import { useEffect, useState } from "react";
import { Button, Dialog, InputText } from "@/presentation/core/components";
import { UploadDishImages } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateDishCategoryRequest,
  DishCategoryRequest,
  UploadImageRequest,
} from "@/domain/dtos";
import { useDishCategoryStore, useMessageStore } from "@/presentation/hooks";
import { DishCategoryModel } from "@/model";

type Props = {
  currentCategory: DishCategoryModel | null;
  setCurrentCategory: (category: DishCategoryModel | null) => void;
  visible: boolean;
  onHide: () => void;
};

export const CategoryDialog = ({
  currentCategory,
  setCurrentCategory,
  visible,
  onHide,
}: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DishCategoryRequest>({
    resolver: zodResolver(DishCategoryRequest.schema),
  });
  const { startSetErrorMessages } = useMessageStore();
  const { startCreatingDishCategory } = useDishCategoryStore();
  const [file, setFile] = useState<{
    file: File;
    isDeleted: boolean;
  } | null>(null);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  const handleSaveCategory = (dishCategoryRequest: DishCategoryRequest) => {
    if (!file) return startSetErrorMessages(["Image is required"]);

    if (currentCategory) {
      // update
    } else {
      const createDishCategoryRequest = new CreateDishCategoryRequest(
        dishCategoryRequest.name,
      );
      const uploadImageRequest = new UploadImageRequest(file.file);
      startCreatingDishCategory(createDishCategoryRequest, uploadImageRequest).then(
        () => {
          setUploadedSuccess(true);
          onHide();
        },
      );
    }
  };

  useEffect(() => {
    console.log("currentCategory", currentCategory);
    if (currentCategory) {
      reset({
        name: currentCategory.name,
      });
    } else
      reset({
        name: "",
      });
  }, [currentCategory]);

  return (
    <Dialog
      visible={visible}
      onHide={() => {
        if (!visible) return;
        onHide();
        setCurrentCategory(null);
      }}
      className="h-[75%] w-[75%] max-w-screen-md"
    >
      <div className="flex justify-center">
        <UploadDishImages
          image={
            currentCategory
              ? {
                  id: currentCategory.id,
                  url: currentCategory.imageUrl,
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
