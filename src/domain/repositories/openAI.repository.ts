import type { ApiResponse, ChatRequest, ChatResponse } from "../dtos";

export abstract class OpenAIRepository {
  abstract chat(chatRequest: ChatRequest): Promise<ApiResponse<ChatResponse>>;
  abstract greetUser(): Promise<ApiResponse<ChatResponse>>;
}
