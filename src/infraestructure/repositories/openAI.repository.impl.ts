import type { ChatRequest } from "@/domain/dtos";
import type { OpenAIRepository } from "@/domain/repositories";
import type { OpenAIService } from "../services";

export class OpenAIRepositoryImpl implements OpenAIRepository {
  constructor(private readonly service: OpenAIService) {}

  public async chat(chatRequest: ChatRequest) {
    return this.service.chat(chatRequest);
  }

  public async greetUser() {
    return this.service.greetUser();
  }
}
