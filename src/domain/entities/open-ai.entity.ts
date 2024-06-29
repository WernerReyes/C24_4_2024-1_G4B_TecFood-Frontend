export enum OpenAIRoleEnum {
  USER = "user",
  ASSISTANT = "assistant",
}

export interface ChatResponse {
  id: string;
  cheated: number;
  choices: Choice[];
}

interface Choice {
  finish_reason: string;
  message: Message;
}

interface Message {
  role: OpenAIRoleEnum;
  content: string;
}
