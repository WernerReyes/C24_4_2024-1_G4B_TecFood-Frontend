import { AppState, TypeMessage, setMessages } from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";

export const useMessage = () => {
  const dispatch = useDispatch();

  const { messages, type } = useSelector((state: AppState) => state.message);

  const startSetMessages = (messages: string[], type: TypeMessage) => {
    dispatch(setMessages({ messages, type }));
  };

  const startClearMessages = () => {
    dispatch(setMessages({ messages: [], type: "" as TypeMessage }));
  };

  return {
    //* Attributes
    messages,
    type,

    //* Methods
    startSetMessages,
    startClearMessages,
  };
};
