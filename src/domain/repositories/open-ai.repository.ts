import type { ChatModel } from "@/model";
import type { ChatDto } from "../dtos";

export interface OpenAIRepository {
  chat(chatDto: ChatDto): Promise<ChatModel>;
  greetUser(): Promise<ChatModel>;
}
