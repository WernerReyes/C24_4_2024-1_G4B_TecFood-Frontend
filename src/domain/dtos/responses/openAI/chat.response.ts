export enum OpenAIRoleEnum {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

export type Message = {
  role: OpenAIRoleEnum;
  content: string;
};

type Choice = {
  message: Message;
};

export interface ChatResponse {
  id: string;
  created: number;
  choices: Choice[];
}
