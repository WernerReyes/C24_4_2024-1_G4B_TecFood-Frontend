import type { DishImageModel } from "@/model";
import {
  FileUpload,
  Image,
  type FileUploadRef,
  type FileUploadSelectEvent,
} from "@/presentation/components";
import clsx from "clsx";
import { FileUploadHeaderTemplateOptions } from "primereact/fileupload";
import { useRef, useState } from "react";

type Size = "small" | "medium" | "large";

type Props = {
  image?: DishImageModel;
  size?: Size;
  setFile: (
    files: {
      file: File;
      isDeleted: boolean;
    } | null,
  ) => void;
  uploadedSuccess: boolean;
  setImageIdToUpdate?: (id: number | null) => void;
};

const MAX_FILE_SIZE = 1000000; // 1MB

export const UploadDishImages = ({
  setFile,
  size = "small",
  uploadedSuccess,
  image,
  setImageIdToUpdate
}: Props) => {
  const fileUploadRef = useRef<FileUploadRef>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSelect = (e: FileUploadSelectEvent) => {
    if (!e.files.length) return;
    setFile({ file: e.files[0], isDeleted: false });
    setCurrentFile(e.files[0]);
    setUploadingImage(true);

    if (setImageIdToUpdate) setImageIdToUpdate(image  ? image.id : null);
  };

  return (
    <div>
      <FileUpload
        className="relative"
        chooseLabel="Upload"
        ref={fileUploadRef}
        chooseOptions={{
          className: clsx(
            "z-10 p-2 absolute mx-auto cursor-pointer",
            "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "pointer-events-none hover:pointer-events-auto",
            sizeClass(size, ["p-1", "p-2", "p-3"]),

            uploadingImage && !uploadedSuccess
              ? "bg-primary/80 text-black/80"
              : "bg-primary/0 text-black/0 hover:text-black/80 hover:bg-primary/80",
          ),

          icon: clsx(
            uploadingImage && !uploadedSuccess && "pi pi-spin pi-spinner",
          ),
        }}
        headerTemplate={(options: FileUploadHeaderTemplateOptions) => {
          const { cancelButton, chooseButton } = options;
          return (
            <>
              <div
                className={clsx(
                  "absolute left-1/2 z-10 mx-auto flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-primary",
                  sizeClass(size, [
                    "bottom-3 h-6 w-6",
                    "bottom-5 h-6 w-6",
                    "bottom-1 h-8 w-8",
                  ]),
                )}
              >
                {cancelButton}
              </div>
              <div
                className={clsx(
                  "absolute left-1/2 top-1/2 z-50 mx-auto flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-primary",
                )}
              >
                {chooseButton}
              </div>
            </>
          );
        }}
        pt={{
          chooseButtonLabel: { className: "hidden" },
          chooseIcon: {
            className: "mx-auto  z-[99]",
          },
          cancelButton: {
            root: { className: "ml-2 mx-auto" },
            label: { className: "hidden" },
          },
        }}
        accept="image/jpeg, image/png, image/jpg"
        maxFileSize={MAX_FILE_SIZE}
        itemTemplate={(file) => <ItemTemplate file={file} size={size} />}
        onSelect={handleSelect}
        onClear={() => {
          if (!currentFile) return;
          setFile({ file: currentFile, isDeleted: true });
          setUploadingImage(false);
        }}
        emptyTemplate={() => <EmptyTemplate size={size} image={image} />}
      />
    </div>
  );
};

const ItemTemplate = ({ file, size }: { file: any; size: Size }) => {
  return (
    <div
      className={clsx(
        "rounded-lg border-2 border-dashed border-primary bg-primary-darker/10",
        sizeClass(size, ["h-32 w-32", "h-48 w-48", "h-64 w-64"]),
        "flex items-center justify-center border border-primary p-1 text-center",
      )}
    >
      <Image
        src={file.objectURL}
        alt={file.name}
        className={clsx("h-full w-full rounded-lg")}
        imageClassName={clsx("object-cover w-full h-full rounded-lg")}
      />
    </div>
  );
};

const EmptyTemplate = ({
  size,
  image,
}: {
  size: Size;
  image?: DishImageModel;
}) => {
  return (
    <div
      className={clsx(
        "rounded-lg border-2 border-dashed border-primary bg-primary-darker/10",
        sizeClass(size, ["h-32 w-32", "h-48 w-48", "h-64 w-64"]),
        "flex flex-col items-center justify-center border border-primary p-4 text-center",
      )}
    >
      {image ? (
        <Image
          src={image.url}
          alt="Dish Image"
          className={clsx(
            sizeClass(size, ["h-28 w-28", "h-44 w-44", "h-60 w-60"]),
          )}
          imageClassName={clsx("object-cover w-full h-full rounded-lg")}
        />
      ) : (
        <>
          <i
            className={clsx(
              "pi pi-image mb-3 rounded-full bg-[var(--surface-b)] text-[var(--surface-d)]",
              sizeClass(size, ["text-5xl", "text-6xl", "text-9xl"]),
            )}
          ></i>
          <span
            className={clsx(
              "text-center text-[var(--text-color-secondary)]",
              sizeClass(size, ["text-xs", "text-xl", "text-2xl"]),
            )}
          >
            Drag and Drop Image Here
          </span>
        </>
      )}
    </div>
  );
};

const sizeClass = (size: string, [small, medium, large]: string[]) => {
  if (size === "small") return [small];
  if (size === "medium") return [medium];
  if (size === "large") return [large];
};
