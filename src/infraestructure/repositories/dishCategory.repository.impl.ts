import type { DishCategoryRepository } from "@/domain/repositories";
import type { DishCategoryService } from "../services";
import type {
  CreateDishCategoryRequest,
  UpdateDishCategoryRequest,
  UploadImageRequest,
} from "@/domain/dtos";

export class DishCategoryRepositoryImpl implements DishCategoryRepository {
  constructor(private readonly dishCategoryService: DishCategoryService) {}

  async create(
    createDishCategoryRequest: CreateDishCategoryRequest,
    uploadImageRequest: UploadImageRequest,
  ) {
    return await this.dishCategoryService.create(
      createDishCategoryRequest,
      uploadImageRequest,
    );
  }

  async update(updateDishCategoryRequest: UpdateDishCategoryRequest) {
    return await this.dishCategoryService.update(updateDishCategoryRequest);
  }

  async getAll() {
    return await this.dishCategoryService.getAll();
  }
}
