import { dtoValidator } from "@/presentation/utilities";
import { z } from "zod";

export enum TypeImage {
  JPG = "image/jpeg",
  PNG = "image/png",
  JPEG = "image/jpg",
}

const MAX_FILES_SIZE = 15000000; // 15MB
const MAX_FILE_SIZE = 5000000; // 5MB

export class UploadImageDto {
  constructor(public readonly files: File[] | File) {}

  public validate() {
    if (Array.isArray(this.files)) {
      dtoValidator(this, UploadImageDto.filesSchema);
    } else {
      dtoValidator(this, UploadImageDto.fileSchema);
    }
  }

  public get toFormData(): FormData {
    const formData = new FormData();
    if (Array.isArray(this.files)) {
      this.files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("file", this.files);
    }

    return formData;
  }

  protected static get fileSchema() {
    return z.object({
      files: z
        .instanceof(File)
        .refine(
          (file) => {
            return Object.values(TypeImage).some((type) =>
              file.type.includes(type),
            );
          },
          {
            message: `File must be a valid image type, supported types are: ${Object.values(TypeImage).join(", ")}`,
          },
        )
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: `File must be less than ${MAX_FILE_SIZE / 1000000}MB`,
        }),
    });
  }

  protected static get filesSchema() {
    return z.object({
      files: z
        .array(z.instanceof(File))
        .nonempty({
          message: "File is required",
        })
        .max(5, {
          message: "You can upload up to 5 files",
        })

        .refine(
          (files) => {
            return Array.from(files).every((file) => {
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
            return Array.from(files).every(
              (file) => file.size <= MAX_FILE_SIZE,
            );
          },
          {
            message: `File must be less than ${MAX_FILE_SIZE / 1000000}MB`,
          },
        )
        .refine(
          (files) => {
            return files.length > 1
              ? Array.from(files).every((file) => file.size <= MAX_FILES_SIZE)
              : true;
          },
          {
            message: `File must be less than ${MAX_FILES_SIZE / 1000000}MB`,
          },
        ),
    });
  }
}
