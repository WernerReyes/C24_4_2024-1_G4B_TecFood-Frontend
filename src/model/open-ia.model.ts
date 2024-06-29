import type { OpenAIRoleEnum } from "@/domain/entities";

export interface ChatModel {
  id: string;
  cheated: number;
  choices: Choice[];
}

interface Choice {
  finishReason: string;
  message: ChatMessages;
}

export interface ChatMessages {
  role: OpenAIRoleEnum;
  content: string;
}
