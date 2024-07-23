import { useNavigate } from "react-router-dom";
import { CreateDishDto, DishDto, UploadImageDto } from "@/domain/dtos";
import { ProgressSpinner } from "@/presentation/core/components";
import { useDishStore } from "@/presentation/hooks";
import { PrivateRoutes } from "@/presentation/routes";
import { useEffect, useState } from "react";
import { ActionDish } from "../components";
import { AdminLayout } from "../layout";


const {
  ADMIN,
  admin: { LIST_DISHES },
} = PrivateRoutes;

const AddDishPage = () => {
  const navigate = useNavigate();
  const { startCreatingDish, isLoading, dish } = useDishStore();
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<{
    file: File;
    isDeleted: boolean;
  } | null>(null);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  const handleSaveDish = async (dishDto: DishDto) => {
    const createDishDto = new CreateDishDto(
      dishDto.name,
      dishDto.description,
      dishDto.price,
      dishDto.categories,
      dishDto.stock,
    );
    const uploadImageDto = new UploadImageDto(files);
    startCreatingDish(createDishDto, uploadImageDto).then(() => {
      setUploadedSuccess(true);
      setFiles([]);
      setFile(null);
      navigate(`${ADMIN}/${LIST_DISHES}`);
    });
  };

  useEffect(() => {
    if (!file) return;
    if (file.isDeleted) {
      setFiles(files.filter((f) => f.name !== file.file.name));
    } else {
      setFiles([...files, file.file]);
    }
  }, [file]);

  return (
    <AdminLayout>
      {isLoading && (
        <ProgressSpinner
          containerClassName="z-[999] fixed"
          darkColor="
        dark:bg-slate-900/40"
          lightColor="bg-white/40"
        />
      )}

      <ActionDish
        dish={dish}
        handleSaveDish={handleSaveDish}
        setFile={setFile}
        uploadedSuccess={uploadedSuccess}
      />
    </AdminLayout>
  );
};

export default AddDishPage;
