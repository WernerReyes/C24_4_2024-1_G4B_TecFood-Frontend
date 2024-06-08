import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { UploadProfileDto } from "@/domain/dtos/user";
import {
  FileUpload,
  FileUploadRef,
  FileUploadSelectEvent,
  Image,
} from "@/presentation/components";
import { useAuthStore, useUserStore } from "@/presentation/hooks";

const MAX_FILE_SIZE = 5000000;

export const UploadProfile = () => {
  const { authenticatedUser } = useAuthStore();
  const { startUploadingProfile, user } = useUserStore();
  const [currentProfile, setCurrentProfile] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileUploadRef = useRef<FileUploadRef>(null);

  const handleSelect = async (e: FileUploadSelectEvent) => {
    setIsLoading(true);
    const file = new FormData();
    file.append("file", e.files[0]);

    const uploadProfileDto = UploadProfileDto.create({
      file,
    });

    await startUploadingProfile(uploadProfileDto);
    if (fileUploadRef.current) fileUploadRef.current.clear();

    setIsLoading(false);
  };

  useEffect(() => {
    if (user.img) setCurrentProfile(user.img);
  }, [user.img]);

  useEffect(() => {
    if (authenticatedUser.img) setCurrentProfile(authenticatedUser.img);
  }, [authenticatedUser.img]);

  return (
    <FileUpload
      chooseLabel={isLoading ? "Uploading...":"Upload Profile"}
      ref={fileUploadRef}
      chooseOptions={{
        className: clsx(
          "z-10 p-2 absolute mt-36 button-0",
          isLoading
            ? "bg-primary/80 text-black/80"
            : "bg-primary/0 text-black/0 hover:text-black/80 hover:bg-primary/80",
        ),
        icon: clsx("pi", isLoading ? "pi-spin pi-spinner" : "pi-fw pi-image"),
      }}
      accept="image/*"
      pt={{
        content: { className: "bg-transparent" },
        buttonbar: { className: "p-0 flex justify-center" },
        uploadButton: { root: { className: "hidden" } },
        cancelButton: { root: { className: "hidden" } },
        progressbar: { root: { className: "hidden" } },
        thumbnail: { className: "h-64 w-64 rounded-full" },
        file: { className: "flex flex-col" },
        details: { className: "hidden" },
        removeButton: { root: { className: "hidden" } },
      }}
      maxFileSize={MAX_FILE_SIZE}
      disabled={isLoading}
      onSelect={handleSelect}
      emptyTemplate={<EmptyTemplate currentProfile={currentProfile} />}
    />
  );
};

const EmptyTemplate = ({ currentProfile }: { currentProfile: string }) => {
  return (
    <div>
      <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full bg-[var(--surface-b)]">
        {currentProfile ? (
          <Image
            src={currentProfile}
            alt="profile"
            imageClassName="rounded-full w-full h-full"
            className="h-full w-full rounded-full"
          />
        ) : (
          <i className="pi pi-image text-[6rem] text-[var(--surface-d)]"></i>
        )}
      </div>

      <span
        className={clsx(
          currentProfile ? "hidden" : "",
          "my-5 text-center text-xl text-[var(--text-color-secondary)]",
        )}
      >
        Upload your profile
      </span>
    </div>
  );
};
