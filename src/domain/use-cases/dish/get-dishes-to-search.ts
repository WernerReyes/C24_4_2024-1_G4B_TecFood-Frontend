import type { DishRepository } from "@/domain/repositories";
import type { GetDishesToSearchModel } from "@/model";

interface GetDishesToSearchUseCase {
  execute(): Promise<GetDishesToSearchModel>;
}

export class GetDishesToSearch implements GetDishesToSearchUseCase {
  constructor(private readonly repository: DishRepository) {}

  async execute(): Promise<GetDishesToSearchModel> {
    return await this.repository.getAllToSearch();
  }
}
