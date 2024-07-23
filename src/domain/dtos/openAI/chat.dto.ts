import { OpenAIRoleEnum } from "@/domain/entities";
import { dtoValidator } from "@/presentation/utilities";
import { z } from "zod";

type Message = {
  role: OpenAIRoleEnum;
  content: string;
};

export class ChatDto {
  constructor(public readonly messages: Message[]) {}

  public validate() {
    dtoValidator(this, ChatDto.schema);
  }
  private static get schema() {
    return z.object({
      messages: z.array(
        z.object({
          role: z
            .nativeEnum(OpenAIRoleEnum)
            .refine((n) => Object.values(OpenAIRoleEnum).includes(n), {
              message: `role must be one of the following values: ${Object.values(OpenAIRoleEnum).join(", ")}`,
            }),
          content: z
            .string()
            .min(5, {
              message: "content must have at least 5 characters",
            })
            .max(500, "content must have a maximum of 500 characters"),
        }),
      ),
    });
  }
}
