import { ZodError, z } from "zod";

export enum TypeImage {
  JPG = "image/jpeg",
  PNG = "image/png",
  JPEG = "image/jpg",
}

export class UploadImageDto {
  constructor(public readonly files: File[]) {}

  public validate(): [UploadImageDto?, string[]?] {
    try {
      const validatedData = UploadImageDto.schema.parse(this);
      return [new UploadImageDto(validatedData.files), undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }

  public get toFormData(): FormData {
    const formData = new FormData();
    Array.from(this.files).forEach((file) => formData.append("files", file));
    return formData;
  }

  protected static get schema() {
    const maxFilesSize = 15000000; // 15MB
    const maxFileSize = 5000000; // 5MB
    return z.object({
      files: z
        .array(z.instanceof(File))
        .nonempty({
          message: "File is required",
        })

        .refine(
          (files) => {
            return Array.from(files).every((file) => {
              console.log(file.type);
              return Object.values(TypeImage).some((type) =>
                file.type.includes(type),
              );
            });
          },
          {
            message: `File must be a valid image type, supported types are: ${Object.values(TypeImage).join(", ")}`,
          },
        )

        .refine(
          (files) => {
            return Array.from(files).every((file) => file.size <= maxFileSize);
          },
          {
            message: `File must be less than ${maxFilesSize / 1000000}MB`,
          },
        ),
    });
  }
}
