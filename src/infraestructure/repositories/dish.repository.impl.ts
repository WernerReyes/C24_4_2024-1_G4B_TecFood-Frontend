import type {
  CreateDishRequest,
  GetDishesRequest,
  GetDishesWithoutSelectedDishRequest,
  UpdateDishRequest,
  UpdateDishImageRequest,
  UploadImageRequest,
  UpdateStatusRequest,
  PutDishOfferRequest,
} from "@/domain/dtos";
import type { DishRepository } from "@/domain/repositories";
import type { DishService } from "../services";

export class DishRepositoryImpl implements DishRepository {
  constructor(private readonly dishService: DishService) {}

  async create(
    createDishRequest: CreateDishRequest,
    uploadDishImages: UploadImageRequest,
  ) {
    return await this.dishService.create(createDishRequest, uploadDishImages);
  }

  async putOffer(putDishOfferRequest: PutDishOfferRequest) {
    return await this.dishService.putOffer(putDishOfferRequest);
  }

  async update(updateDishRequest: UpdateDishRequest) {
    return await this.dishService.update(updateDishRequest);
  }

  async updateImage(updateDishImageRequest: UpdateDishImageRequest) {
    return await this.dishService.updateImage(updateDishImageRequest);
  }

  async updateStatus(updateStatusRequest: UpdateStatusRequest) {
    return await this.dishService.updateStatus(updateStatusRequest);
  }

  async delete(id: number) {
    return await this.dishService.delete(id);
  }

  async deleteMany(ids: number[]) {
    return await this.dishService.deleteMany(ids);
  }

  async getAllPaginated(getDishesRequest: GetDishesRequest) {
    return await this.dishService.getAllPaginated(getDishesRequest);
  }

  async getAll() {
    return await this.dishService.getAll();
  }

  async getAllPublished() {
    return await this.dishService.getAllPublished();
  }

  async getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishRequest: GetDishesWithoutSelectedDishRequest,
  ) {
    return await this.dishService.getAllWithoutSelectedDish(
      getDishesWithoutSelectedDishRequest,
    );
  }

  async getById(id: number) {
    return await this.dishService.getById(id);
  }
}
