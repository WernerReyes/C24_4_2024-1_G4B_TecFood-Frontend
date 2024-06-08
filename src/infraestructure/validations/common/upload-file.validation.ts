import { z } from "zod";

const MAX_FILE_SIZE = 5000000;

export const uploadFileValidation = z.object({
  file: z
    .instanceof(FormData)
    .refine((file) => file.get("file") !== null, {
      message: "File is required",
    })
    .refine(
      (file) => {
        const fileData = file.get("file");
        return fileData instanceof File && fileData.size <= MAX_FILE_SIZE;
      },
      {
        message: `File must be less than ${MAX_FILE_SIZE / 1000000}MB`,
      }
    ),
});
