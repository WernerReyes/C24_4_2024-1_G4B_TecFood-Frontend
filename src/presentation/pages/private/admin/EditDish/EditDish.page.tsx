import { useEffect, useState } from "react";
import { DishRequest, UpdateDishRequest, UpdateDishImageRequest } from "@/domain/dtos";
import { useDishStore } from "@/presentation/hooks";
import { ActionDish } from "../components";
import { AdminLayout } from "../layout";

const EditDishPage = () => {
  const { dish, startUpdatingDish, startUpdatingDishImage } = useDishStore();
  const [file, setFile] = useState<{
    file: File;
    isDeleted: boolean;
  } | null>(null);
  const [imageIdToUpdate, setImageIdToUpdate] = useState<number | null>(null);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  const handleUploadImage = () => {
    const updateDishImageRequest = new UpdateDishImageRequest(
      dish.id,
      file!.file,
      imageIdToUpdate,
    );
    startUpdatingDishImage(updateDishImageRequest).then(() => {
      setUploadedSuccess(true);
      setFile(null);
    });
  };

  const handleSaveDish = (dishRequest: DishRequest) => {
    const updateDishRequest = new UpdateDishRequest(
      dish.id,
      dishRequest.name,
      dishRequest.description,
      dishRequest.price,
      dishRequest.categories,
      dishRequest.stock,
    );
    startUpdatingDish(updateDishRequest);
  };

  useEffect(() => {
    if (!file || file.isDeleted) return;
    handleUploadImage();
  }, [file]);

  return (
    <AdminLayout>
      <ActionDish
        dish={dish}
        handleSaveDish={handleSaveDish}
        setFile={setFile}
        uploadedSuccess={uploadedSuccess}
        setImageIdToUpdate={setImageIdToUpdate}
      />
    </AdminLayout>
  );
};

export default EditDishPage;
