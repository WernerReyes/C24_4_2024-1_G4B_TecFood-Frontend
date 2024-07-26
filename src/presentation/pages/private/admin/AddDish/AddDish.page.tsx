import { useNavigate } from "react-router-dom";
import { CreateDishRequest, DishRequest, UploadImageRequest } from "@/domain/dtos";
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

  const handleSaveDish = async (dishRequest: DishRequest) => {
    const createDishRequest = new CreateDishRequest(
      dishRequest.name,
      dishRequest.description,
      dishRequest.price,
      dishRequest.categories,
      dishRequest.stock,
    );
    const uploadImageRequest = new UploadImageRequest(files);
    startCreatingDish(createDishRequest, uploadImageRequest).then(() => {
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
          containerClassName="z-[999] fixed inset-0 flex items-center justify-center bg-opacity-50"
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
