import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { ProgressSpinner } from "@/presentation/components";
import { CreateDishDto, UploadImageDto } from "@/domain/dtos";
import { FormAddDish, UploadDishImages } from "../components";
import { AdminLayout } from "../layout";
import { useDishStore } from "@/presentation/hooks";
import { PrivateRoutes } from "@/presentation/routes";

const {
  ADMIN,
  admin: { DISHES_LIST },
} = PrivateRoutes;

const AddDishPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDishDto>({
    resolver: zodResolver(CreateDishDto.schema),
  });
  const navigate = useNavigate();
  const { startCreateDish, isLoading } = useDishStore();
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<{
    file: File;
    isDeleted: boolean;
  } | null>(null);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  const handleSaveDish = async (data: CreateDishDto) => {
    const createDishDto = new CreateDishDto(
      data.name,
      data.description,
      data.price,
      data.categories,
      data.stock,
    );
    const uploadImageDto = new UploadImageDto(files).validate();
    startCreateDish(createDishDto, uploadImageDto).then(() => {
      setUploadedSuccess(true);
      reset();
      setFiles([]);
      setFile(null);
      navigate(`${ADMIN}/${DISHES_LIST}`);
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
    <>
      {isLoading && (
        <ProgressSpinner
          containerClassName="z-[999] fixed"
          darkColor="
        dark:bg-slate-900/40"
          lightColor="bg-white/40"
        />
      )}
      <AdminLayout>
        <section className="container mx-auto mt-5 grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
          <div className="col-span-1 flex flex-col rounded-md border-2 border-skeleton p-4 dark:border-skeleton-dark">
            <div className="mx-auto">
              <UploadDishImages
                setFile={setFile}
                uploadedSuccess={uploadedSuccess}
                size="large"
              />
            </div>
            <h6 className="mt-4">Aditional Images</h6>
            <div className="flex justify-evenly">
              <UploadDishImages
                setFile={setFile}
                uploadedSuccess={uploadedSuccess}
              />
              <UploadDishImages
                setFile={setFile}
                uploadedSuccess={uploadedSuccess}
              />
            </div>
            <Inplace>
              <InplaceDisplay>
                <small className="text-slate-600">More Images</small>
              </InplaceDisplay>
              <InplaceContent>
                <div className="flex justify-evenly">
                  <UploadDishImages
                    setFile={setFile}
                    uploadedSuccess={uploadedSuccess}
                  />
                  <UploadDishImages
                    setFile={setFile}
                    uploadedSuccess={uploadedSuccess}
                  />
                </div>
              </InplaceContent>
            </Inplace>
          </div>
          <div className="col-span-1 flex flex-col rounded-md border-2 border-skeleton p-4 dark:border-skeleton-dark">
            <FormAddDish
              control={control}
              handleSubmit={handleSubmit(handleSaveDish)}
              errors={!!Object.keys(errors).length}
              reset={reset}
            />
          </div>
        </section>
      </AdminLayout>
    </>
  );
};

export default AddDishPage;
