import { httpRequest } from "@/config/api";
import type { ApiResponse, ChatDto, ChatResponse } from "@/domain/dtos";

interface IOpenAIService {
  chat(chatDto: ChatDto): Promise<ApiResponse<ChatResponse>>;
  greetUser(): Promise<ApiResponse<ChatResponse>>;
}

export class OpenAIService implements IOpenAIService {
  private prefix: string;

  constructor() {
    this.prefix = "/openai";
  }

  public async chat(chatDto: ChatDto) {
    try {
      return await httpRequest<ChatResponse>(
        `${this.prefix}/chat`,
        "POST",
        chatDto,
      );
    } catch (error) {
      throw error;
    }
  }

  public async greetUser() {
    try {
      return await httpRequest<ChatResponse>(`${this.prefix}/greet`, "GET");
    } catch (error) {
      throw error;
    }
  }
}
