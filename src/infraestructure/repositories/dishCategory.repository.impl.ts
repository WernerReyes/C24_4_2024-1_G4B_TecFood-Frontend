import type { DishCategoryRepository } from "@/domain/repositories";
import type { DishCategoryService } from "../services";
import type {
  CreateDishCategoryDto,
  UpdateDishCategoryDto,
  UploadImageDto,
} from "@/domain/dtos";

export class DishCategoryRepositoryImpl implements DishCategoryRepository {
  constructor(private readonly dishCategoryService: DishCategoryService) {}

  async create(
    createDishCategoryDto: CreateDishCategoryDto,
    uploadImageDto: UploadImageDto,
  ) {
    return await this.dishCategoryService.create(
      createDishCategoryDto,
      uploadImageDto,
    );
  }

  async update(updateDishCategoryDto: UpdateDishCategoryDto) {
    return await this.dishCategoryService.update(updateDishCategoryDto);
  }

  async getAll() {
    return await this.dishCategoryService.getAll();
  }
}
