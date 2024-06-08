import { uploadFileValidation } from "@/infraestructure/validations";
import { ZodError } from "zod";

export enum TypeImage {
  JPG,
  PNG,
  JPEG,
}

export class UploadFileDto {
  protected constructor(public readonly file: FormData) {}

  public static create(data: UploadFileDto): [UploadFileDto?, string[]?] {
    try {
      const validatedData = uploadFileValidation.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }
}
