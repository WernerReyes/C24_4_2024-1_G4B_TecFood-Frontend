import React, { forwardRef, useImperativeHandle } from "react";
import {
  FileUpload as FileUploadPrimeReact,
  type FileUploadProps,
  type FileUploadSelectEvent as FileUploadSelectEventPrimeReact,
  type FileUploadUploadEvent as FileUploadUploadEventPrimeReact,
} from "primereact/fileupload";

export interface FileUploadSelectEvent
  extends FileUploadSelectEventPrimeReact {}

export interface FileUploadUploadEvent
  extends FileUploadUploadEventPrimeReact {}

export type FileUploadRef = {
  clear: () => void;
  formatSize: (size: number) => number;
};

interface Props extends FileUploadProps {}

export const FileUpload = forwardRef<FileUploadRef, Props>(
  ({ ...props }, ref) => {
    const fileUploadRef = React.createRef<FileUploadPrimeReact>();

    useImperativeHandle(ref, () => ({
      clear: () => fileUploadRef.current?.clear(),
      formatSize: (size) => fileUploadRef.current?.formatSize(size) || 0,
    }));

    return (
      <FileUploadPrimeReact
        ref={fileUploadRef}
        {...props}
        pt={{
          ...props.pt,
          content: { className: "bg-transparent" },
          buttonbar: { className: "p-0 flex justify-center" },
          uploadButton: { root: { className: "hidden" } },
          progressbar: { root: { className: "hidden" } },
          thumbnail: { className: "h-64 w-64 rounded-full" },
          file: { className: "flex flex-col" },
          details: { className: "hidden" },
          removeButton: { root: { className: "hidden" } },
        }}
      />
    );
  },
);
