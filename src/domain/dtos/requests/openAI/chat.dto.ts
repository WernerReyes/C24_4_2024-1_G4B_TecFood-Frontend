import { z } from "zod";
import { OpenAIRoleEnum } from "@/domain/entities";
import { dtoValidator } from "@/presentation/utilities";

type ChatDtoModel = {
  readonly messages: Message[];
};

type Message = {
  readonly role: OpenAIRoleEnum;
  readonly content: string;
};

export class ChatDto implements ChatDtoModel {
  constructor(public readonly messages: Message[]) {}

  public validate() {
    dtoValidator(this, ChatDto.schema);
  }
  private static get schema(): z.ZodSchema<ChatDtoModel> {
    return ChatDtoSchema;
  }
}

const ChatDtoSchema = z.object({
  messages: z.array(
    z.object({
      role: z
        .nativeEnum(OpenAIRoleEnum)
        .refine((n) => Object.values(OpenAIRoleEnum).includes(n), {
          message: `role must be one of the following values: ${Object.values(OpenAIRoleEnum).join(", ")}`,
        }),
      content: z
        .string()
        .min(5, "content must have at least 5 characters")
        .max(500, "content must have a maximum of 500 characters"),
    }),
  ),
});
