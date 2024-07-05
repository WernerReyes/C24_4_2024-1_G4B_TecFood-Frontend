import type { ChatDto } from "@/domain/dtos";
import type { OpenAIRepository } from "@/domain/repositories";
import type { OpenAIService } from "../services";

export class OpenAIRepositoryImpl implements OpenAIRepository {
  constructor(private readonly service: OpenAIService) {}

  public async chat(chatDto: ChatDto) {
    return this.service.chat(chatDto);
  }

  public async greetUser() {
    return this.service.greetUser();
  }
}
