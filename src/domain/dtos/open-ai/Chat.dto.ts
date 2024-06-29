import { ZodError, z } from "zod";
import { OpenAIRoleEnum } from "@/domain/entities";

type Message = {
  role: OpenAIRoleEnum;
  content: string;
};

export class ChatDto {
  constructor(public readonly messages: Message[]) {}

  public static create(data: ChatDto): [ChatDto?, string[]?] {
    try {
      const validatedData = this.validations.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }

  protected static get validations() {
    return z.object({
      messages: z.array(
        z.object({
          role: z
            .nativeEnum(OpenAIRoleEnum)
            .refine((n) => Object.values(OpenAIRoleEnum).includes(n), {
              message: `role must be one of the following values: ${Object.values(OpenAIRoleEnum).join(", ")}`,
            }),
          content: z.string(),
        }),
      ),
    });
  }
}
