import { httpRequest } from "@/config/api";
import type { ChatDto } from "@/domain/dtos";
import type { ChatResponse, ChoiceBackend, ChoiceFrontend } from "@/model";

interface IOpenAIService {
  chat(chatDto: ChatDto): Promise<ChatResponse<ChoiceFrontend>>;
  greetUser(): Promise<ChatResponse<ChoiceFrontend>>;
}

export class OpenAIService implements IOpenAIService {
  private prefix: string;

  constructor() {
    this.prefix = "/openai";
  }

  public async chat(chatDto: ChatDto): Promise<ChatResponse<ChoiceFrontend>> {
    try {
      const { data } = await httpRequest<ChatResponse<ChoiceBackend>>(
        `${this.prefix}/chat`,
        "POST",
        chatDto,
      );

      return { ...data, choices: choiseAdapter(data.choices) };
    } catch (error) {
      throw error;
    }
  }

  public async greetUser(): Promise<ChatResponse<ChoiceFrontend>> {
    try {
      const { data } = await httpRequest<ChatResponse<ChoiceBackend>>(
        `${this.prefix}/greet`,
        "GET",
      );

      return { ...data, choices: choiseAdapter(data.choices) };
    } catch (error) {
      throw error;
    }
  }
}

const choiseAdapter = (choices: ChoiceBackend[]): ChoiceFrontend[] => {
  return choices.map((choice) => ({
    finishReason: choice.finish_reason,
    message: choice.message,
  }));
};
