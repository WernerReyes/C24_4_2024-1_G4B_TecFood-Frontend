import { httpRequest } from "@/config/api";
import type { ApiResponse, ChatRequest, ChatResponse } from "@/domain/dtos";

interface IOpenAIService {
  chat(chatRequest: ChatRequest): Promise<ApiResponse<ChatResponse>>;
  greetUser(): Promise<ApiResponse<ChatResponse>>;
}

export class OpenAIService implements IOpenAIService {
  private prefix: string;

  constructor() {
    this.prefix = "/openai";
  }

  public async chat(chatRequest: ChatRequest) {
    try {
      return await httpRequest<ChatResponse>(
        `${this.prefix}/chat`,
        "POST",
        chatRequest,
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
