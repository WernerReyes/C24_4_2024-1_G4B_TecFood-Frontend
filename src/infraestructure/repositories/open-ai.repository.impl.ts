import type { OpenAIRepository } from "@/domain/repositories";
import type { OpenAIService } from "../services";
import type { ChatDto } from "@/domain/dtos";
import type { ChatModel } from "@/model";

export class OpenAIRepositoryImpl implements OpenAIRepository {
  constructor(private readonly service: OpenAIService) {}

  public async chat(chatDto: ChatDto): Promise<ChatModel> {
    return this.service.chat(chatDto);
  }

  public async greetUser(): Promise<ChatModel> {
    return this.service.greetUser();
  }
}
