import { ApiResponseStatus } from "@/config/api";
import { toast } from "sonner";

export const showMessage = (type: ApiResponseStatus, message: string[]) => {
  switch (type) {
    case ApiResponseStatus.SUCCESS:
      successMessage(message);
      break;

    case ApiResponseStatus.ERROR:
      errorMessage(message);
      break;

    // case TypeMessage.INFO:
    //   infoMessage(message);
    //   break;

    case ApiResponseStatus.WARNING:
      warningMessage(message);
      break;

    default:
      break;
  }
};

export const successMessage = (message: string[]) => {
  message.forEach((msg) => toast.success(msg));
};

export const errorMessage = (message: string[]) => {
  message.forEach((msg) => toast.error(msg));
};

export const infoMessage = (message: string[]) => {
  message.forEach((msg) => toast.info(msg));
};

export const warningMessage = (message: string[]) => {
  message.forEach((msg) => toast.warning(msg));
};

