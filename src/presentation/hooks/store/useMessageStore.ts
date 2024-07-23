import { AppState, TypeMessage, setMessages } from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";

export const useMessageStore = () => {
  const dispatch = useDispatch();

  const { messages, type } = useSelector((state: AppState) => state.message);

  const startSetMessages = (messages: string[], type: TypeMessage) => {
    dispatch(setMessages({ messages, type }));
  };

  const startClearMessages = () => {
    dispatch(setMessages({ messages: [], type: "" as TypeMessage }));
  };

  const startSetSuccessMessages = (messages: string[]) => {
    startSetMessages(messages, TypeMessage.SUCCESS);
  };

  const startSetErrorMessages = (messages: string[]) => {
    startSetMessages(messages, TypeMessage.ERROR);
  };

  return {
    //* Attributes
    messages,
    type,
    typeError: TypeMessage.ERROR,
    typeSuccess: TypeMessage.SUCCESS,
    typeWarning: TypeMessage.WARNING,
    typeInfo: TypeMessage.INFO,

    //* Methods
    startSetSuccessMessages,
    startSetErrorMessages,
    startSetMessages,
    startClearMessages,
  };
};
