import { ApiResponseStatus } from "@/domain/dtos";
import { AppState, setMessages } from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";

export const useMessageStore = () => {
  const dispatch = useDispatch();

  const { messages, type } = useSelector((state: AppState) => state.message);

  const startSetMessages = (messages: string[], type: ApiResponseStatus) => {
    dispatch(setMessages({ messages, type }));
  };

  const startClearMessages = () => {
    dispatch(setMessages({ messages: [], type: "" as ApiResponseStatus }));
  };

  const startSetMessagesSuccess = (messages: string[]) => {
    startSetMessages(messages, ApiResponseStatus.SUCCESS);
  };

  const startSetMessagesError = (messages: string[]) => {
    startSetMessages(messages, ApiResponseStatus.ERROR);
  };

  return {
    //* Attributes
    messages,
    type,

    //* Methods
    startSetMessages,
    startSetMessagesSuccess,
    startSetMessagesError,
    startClearMessages,
  };
};
