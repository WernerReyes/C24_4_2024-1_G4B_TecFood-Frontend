import type { ChatDto } from "@/domain/dtos";
import type { OpenAIRepository } from "@/domain/repositories";
import type { ChatModel } from "@/model";

interface ChatUseCase {
  execute(chatDto: ChatDto): Promise<ChatModel>;
}

export class Chat implements ChatUseCase {
  constructor(private readonly repository: OpenAIRepository) {}

  public async execute(chatDto: ChatDto): Promise<ChatModel> {
    return this.repository.chat(chatDto);
  }
}
