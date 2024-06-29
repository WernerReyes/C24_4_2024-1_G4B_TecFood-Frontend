import { httpRequest } from "@/config/api";
import { ChatDto } from "@/domain/dtos";
import { ChatResponse } from "@/domain/entities";
import { ChatModel } from "@/model";

interface IOpenAIService {
  chat(chatDto: ChatDto): Promise<ChatModel>;
  greetUser(): Promise<ChatModel>;
}

export class OpenAIService implements IOpenAIService {
  private prefix: string;

  constructor() {
    this.prefix = "/openai";
  }

  public async chat(chatDto: ChatDto): Promise<ChatModel> {
    try {
      const { data } = await httpRequest<ChatResponse>(
        `${this.prefix}/chat`,
        "POST",
        chatDto,
      );

      return ChatAdapter(data);
    } catch (error) {
      throw error;
    }
  }

  public async greetUser(): Promise<ChatModel> {
    try {
      const { data } = await httpRequest<ChatResponse>(
        `${this.prefix}/greet`,
        "GET",
      );

      return ChatAdapter(data);
    } catch (error) {
      throw error;
    }
  }
}

const ChatAdapter = (chatResponse: ChatResponse): ChatModel => ({
  id: chatResponse.id,
  cheated: chatResponse.cheated,
  choices: chatResponse.choices.map((choice) => ({
    finishReason: choice.finish_reason,
    ...choice,
  })),
});
