import type {
  CreateDishCategoryResponse,
  DishCategoryModel,
  GetDishCategoriesResponse,
} from "@/model";
import type { CreateDishCategoryDto, UploadImageDto } from "../dtos";

export abstract class DishCategoryRepository {
  abstract create(
    createDishCategoryDto: CreateDishCategoryDto,
    uploadImageDto: UploadImageDto,
  ): Promise<CreateDishCategoryResponse<DishCategoryModel>>;
  abstract getAll(): Promise<GetDishCategoriesResponse<DishCategoryModel>>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
