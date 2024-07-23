import type { DishCategoryEntity } from "@/domain/entities";
import type {
  CreateDishCategoryResponse,
  DishCategoryModel,
  GetDishCategoriesResponse,
} from "@/model";
import { dishCategoryAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import { CreateDishCategoryDto } from "@/domain/dtos";
import { UploadImageDto } from "../../domain/dtos/common/uploadImage.dto";

interface IDishCategoryService {
  create(
    createDishCategoryDto: CreateDishCategoryDto,
    uploadImageDto: UploadImageDto,
  ): Promise<CreateDishCategoryResponse<DishCategoryModel>>;
  getAll(): Promise<GetDishCategoriesResponse<DishCategoryModel>>;
}

export class DishCategoryService implements IDishCategoryService {
  private prefix: string;

  constructor() {
    this.prefix = "/dish-category";
  }

  public async create(
    createDishCategoryDto: CreateDishCategoryDto,
    uploadImageDto: UploadImageDto,
  ) {
    try {
      const formData = new FormData();
      createDishCategoryDto.toFormData.forEach((value, key) =>
        formData.append(key, value),
      );

      uploadImageDto.toFormData.forEach((value, key) =>
        formData.append(key, value),
      );

      console.log("formData", formData.get("createDishCategoryDto"));

      const { data } = await httpRequest<
        CreateDishCategoryResponse<DishCategoryEntity>
      >(this.prefix, "POST", formData);
      return {
        ...data,
        dishCategory: dishCategoryAdapter(data.dishCategory),
      };
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const { data } = await httpRequest<
        GetDishCategoriesResponse<DishCategoryEntity>
      >(this.prefix, "GET");
      return {
        ...data,
        dishCategories: data.dishCategories.map(dishCategoryAdapter),
      };
    } catch (error) {
      throw error;
    }
  }
}
