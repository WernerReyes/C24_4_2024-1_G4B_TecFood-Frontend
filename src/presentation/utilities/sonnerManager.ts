import { TypeMessage } from "@/infraestructure/store";
import { toast } from "sonner";

export const showMessage = (type: TypeMessage, message: string[]) => {
  switch (type) {
    case TypeMessage.SUCCESS:
      successMessage(message);
      break;

    case TypeMessage.ERROR:
      errorMessage(message);
      break;

    case TypeMessage.INFO:
      infoMessage(message);
      break;

    case TypeMessage.WARNING:
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

