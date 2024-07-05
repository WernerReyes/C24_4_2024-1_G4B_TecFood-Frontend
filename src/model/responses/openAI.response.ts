import type { OpenAIRoleEnum } from "@/domain/entities";

export interface ChatResponse<T> {
  id: string;
  cheated: number;
  choices: T[]; // ChoiceBackend[] | ChoiceFrontend[]
}

interface Message {
  role: OpenAIRoleEnum;
  content: string;
}

//* Backend
export interface ChoiceBackend {
  finish_reason: string;
  message: Message;
}

//* Frontend
export interface ChoiceFrontend {
  finishReason: string;
  message: Message;
}
