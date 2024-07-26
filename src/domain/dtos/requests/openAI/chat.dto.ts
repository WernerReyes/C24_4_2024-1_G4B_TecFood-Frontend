import { z } from "zod";
import { dtoValidator } from "@/presentation/utilities";
import { type Message } from "../../responses/openAI";
import { OpenAIRoleEnum } from "@/domain/entities";


type ChatDtoModel = {
  readonly messages: Message[];
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
        .refine((n) => console.log(n), {
          message: `role must be one of the following values: ${Object.values(OpenAIRoleEnum).join(", ")}`,
        }),
        // .refine((n) => Object.values(OpenAIRoleEnum).includes(n), {
        //   message: `role must be one of the following values: ${Object.values(OpenAIRoleEnum).join(", ")}`,
        // }),
      content: z
        .string()
        .min(5, "content must have at least 5 characters")
        .max(500, "content must have a maximum of 500 characters"),
    }),
  ),
});
