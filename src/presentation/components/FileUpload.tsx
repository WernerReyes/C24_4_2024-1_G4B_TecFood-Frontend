import React, { forwardRef, useImperativeHandle } from "react";
import {
  FileUpload as FileUploadPrimeReact,
  type FileUploadProps,
  type FileUploadSelectEvent as FileUploadSelectEventPrimeReact,
} from "primereact/fileupload";


export interface FileUploadSelectEvent
  extends FileUploadSelectEventPrimeReact {}

export type FileUploadRef = {
  clear: () => void;
};

interface Props extends FileUploadProps {}

export const FileUpload = forwardRef<FileUploadRef, Props>(
  ({ ...props }, ref) => {
    const fileUploadRef = React.createRef<FileUploadPrimeReact>();

    useImperativeHandle(ref, () => ({
      clear: () => fileUploadRef.current?.clear(),
    }));

    return <FileUploadPrimeReact ref={fileUploadRef} {...props} />;
  },
);
