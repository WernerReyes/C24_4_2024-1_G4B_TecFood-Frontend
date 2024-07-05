import { ZodError, z } from "zod";

export enum TypeImage {
  JPG,
  PNG,
  JPEG,
}

export class UploadFileDto {
  protected constructor(public readonly file: FormData) {}

  public static create(data: UploadFileDto): [UploadFileDto?, string[]?] {
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
    const maxFileSize = 5000000;
    return z.object({
      file: z
        .instanceof(FormData)
        .refine((file) => file.get("file") !== null, {
          message: "File is required",
        })
        .refine(
          (file) => {
            const fileData = file.get("file");
            return fileData instanceof File && fileData.size <= maxFileSize;
          },
          {
            message: `File must be less than ${maxFileSize / 1000000}MB`,
          },
        ),
    });
  }
}
