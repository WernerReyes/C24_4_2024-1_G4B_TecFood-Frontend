import type { OpenAIRepository } from "@/domain/repositories";
import type { ChatModel } from "@/model";

export interface GreetUserUseCase {
  execute(): Promise<ChatModel>;
}

export class GreetUser implements GreetUserUseCase {
  constructor(private readonly repository: OpenAIRepository) {}

  public async execute(): Promise<ChatModel> {
    return this.repository.greetUser();
  }
}
