import { useEffect, useState } from "react";
import { DishDto, UpdateDishDto, UpdateDishImageDto } from "@/domain/dtos";
import { useDishStore } from "@/presentation/hooks";
import { ActionDish } from "../components";
import { AdminLayout } from "../layout";


const EditDishPage = () => {
  const {
    dish,
    startUpdatingDish,
    startUpdatingDishImage,
  } = useDishStore();
  const [file, setFile] = useState<{
    file: File;
    isDeleted: boolean;
  } | null>(null);
  const [imageIdToUpdate, setImageIdToUpdate] = useState<number | null>(null);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  const handleUploadImage = () => {
    const updateDishImageDto = new UpdateDishImageDto(
      dish.id,
      file!.file,
      imageIdToUpdate,
    );
    startUpdatingDishImage(updateDishImageDto).then(() => {
      setUploadedSuccess(true);
      setFile(null);
    });
  };

  const handleSaveDish = (dishDto: DishDto) => {
    const updateDishDto = new UpdateDishDto(
      dish.id,
      dishDto.name,
      dishDto.description,
      dishDto.price,
      dishDto.categories,
      dishDto.stock,
    );
    startUpdatingDish(updateDishDto);
  };

  useEffect(() => {
    if (!file || file.isDeleted) return;
    handleUploadImage();
  }, [file]);

  return (
    <>
      <AdminLayout>
        <ActionDish
          dish={dish}
          handleSaveDish={handleSaveDish}
          setFile={setFile}
          uploadedSuccess={uploadedSuccess}
          setImageIdToUpdate={setImageIdToUpdate}
        />
      </AdminLayout>
    </>
  );
};

export default EditDishPage;
