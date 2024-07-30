import type {
  CreateDishCategoryRequest,
  UpdateDishCategoryImageRequest,
  UpdateDishCategoryRequest,
  UpdateStatusRequest,
  UploadImageRequest,
} from "@/domain/dtos";
import type { DishCategoryRepository } from "@/domain/repositories";
import type { DishCategoryService } from "../services";

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

  async updateImage(
    updateDishCategoryImageRequest: UpdateDishCategoryImageRequest,
  ) {
    return await this.dishCategoryService.updateImage(
      updateDishCategoryImageRequest,
    );
  }

  async updateStatus(updateStatusRequest: UpdateStatusRequest) {
    return await this.dishCategoryService.updateStatus(updateStatusRequest);
  }

  async delete(dishCategoryId: number) {
    return await this.dishCategoryService.delete(dishCategoryId);
  }

  async deleteMany(dishCategoryIds: number[]) {
    return await this.dishCategoryService.deleteMany(dishCategoryIds);
  }

  async getAll() {
    return await this.dishCategoryService.getAll();
  }

  async getAllPublished() {
    return await this.dishCategoryService.getAllPublished();
  }
}
