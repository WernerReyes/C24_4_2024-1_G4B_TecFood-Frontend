import type { ChatResponse, ChoiceFrontend } from "@/model";
import type { ChatDto } from "../dtos";

export abstract class OpenAIRepository {
  abstract chat(chatDto: ChatDto): Promise<ChatResponse<ChoiceFrontend>>;
  abstract greetUser(): Promise<ChatResponse<ChoiceFrontend>>;
}
