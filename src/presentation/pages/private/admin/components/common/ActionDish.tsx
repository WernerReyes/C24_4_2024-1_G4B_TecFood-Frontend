import {
    DishDto
} from "@/domain/dtos";
import { DishModel } from "@/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { useForm } from "react-hook-form";
import { FormDish, UploadDishImages } from "../";
 
 type Props = {
    dish: DishModel;
    handleSaveDish: (dishDto: DishDto) => void;
    setFile: (file: { file: File; isDeleted: boolean } | null) => void;
    uploadedSuccess: boolean;
    setImageIdToUpdate?: (imageId: number | null) => void;
  };

 export const ActionDish = ({ dish, handleSaveDish, setFile, uploadedSuccess, setImageIdToUpdate }: Props) => {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<DishDto>({
      resolver: zodResolver(DishDto.schema),
    });
  
    return (
      <>
          <section className="container mx-auto mt-5 grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
            <div className="col-span-1 flex flex-col rounded-md border-2 border-skeleton p-4 dark:border-skeleton-dark">
              <div className="mx-auto">
                <UploadDishImages
                  image={dish.images[0]}
                  setFile={setFile}
                  uploadedSuccess={uploadedSuccess}
                  setImageIdToUpdate={setImageIdToUpdate}
                  size="large"
                />
              </div>
              <h6 className="mt-4">Aditional Images</h6>
              <div className="flex justify-evenly">
                <UploadDishImages
                  image={dish.images[1]}
                  setFile={setFile}
                  uploadedSuccess={uploadedSuccess}
                  setImageIdToUpdate={setImageIdToUpdate}
                />
                <UploadDishImages
                  image={dish.images[2]}
                  setFile={setFile}
                  uploadedSuccess={uploadedSuccess}
                  setImageIdToUpdate={setImageIdToUpdate}
                />
              </div>
              <Inplace>
                <InplaceDisplay>
                  <small className="text-slate-600">More Images</small>
                </InplaceDisplay>
                <InplaceContent>
                  <div className="flex justify-evenly">
                    <UploadDishImages
                      image={dish.images[3]}
                      setFile={setFile}
                      uploadedSuccess={uploadedSuccess}
                      setImageIdToUpdate={setImageIdToUpdate}
                    />
                    <UploadDishImages
                      image={dish.images[4]}
                      setFile={setFile}
                      uploadedSuccess={uploadedSuccess}
                      setImageIdToUpdate={setImageIdToUpdate}
                    />
                  </div>
                </InplaceContent>
              </Inplace>
            </div>
            <div className="col-span-1 flex flex-col rounded-md border-2 border-skeleton p-4 dark:border-skeleton-dark">
              <FormDish
                control={control}
                dish={dish}
                handleSubmit={handleSubmit(handleSaveDish)}
                errors={!!Object.keys(errors).length}
                reset={reset}
              />
            </div>
          </section>
      
      </>
    );
  };
 