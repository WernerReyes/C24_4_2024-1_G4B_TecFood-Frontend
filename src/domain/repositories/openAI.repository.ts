import type { ApiResponse, ChatDto, ChatResponse } from "../dtos";

export abstract class OpenAIRepository {
  abstract chat(chatDto: ChatDto): Promise<ApiResponse<ChatResponse>>;
  abstract greetUser(): Promise<ApiResponse<ChatResponse>>;
}
