import { useDispatch, useSelector } from "react-redux";
import type { ChatDto } from "@/domain/dtos";
import { OpenAIRepositoryImpl } from "@/infraestructure/repositories";
import { OpenAIService } from "@/infraestructure/services";
import {
  onAddChatMessage,
  onLoadChatMessages,
  onLoadingopenIA,
  onResetChatMessages,
  onSetAvailableChat,
  type AppState,
} from "@/infraestructure/store";
import { getStorage } from "@/presentation/utilities";
import { useMessageStore } from "./useMessageStore";

const openAIService = new OpenAIService();
const openAIRepositoryImpl = new OpenAIRepositoryImpl(openAIService);

export const useOpenAIStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages, typeError } = useMessageStore();
  const { chatMessages, isLoading, isAvailableChat } = useSelector(
    (state: AppState) => state.openIA,
  );

  const startGetGreetUser = async () => {
    dispatch(onLoadingopenIA());

    if (getStorage("chatMessages"))
      return dispatch(onLoadChatMessages(getStorage("chatMessages")!));
    openAIRepositoryImpl
      .greetUser()
      .then(({ choices, id }) => {
        if (id !== "Error") dispatch(onSetAvailableChat());
        dispatch(onAddChatMessage(choices[0].message));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startSendingMenssage = async (chatDto: [ChatDto?, string[]?]) => {
    dispatch(onLoadingopenIA());
    const [validatedData, errors] = chatDto;
    if (errors) return startSetMessages(errors, typeError);
    dispatch(
      onAddChatMessage(
        validatedData?.messages[validatedData.messages.length - 1]!,
      ),
    );
    openAIRepositoryImpl
      .chat(validatedData!)
      .then(({ choices, id }) => {
        if (id !== "Error") dispatch(onSetAvailableChat());
        dispatch(onAddChatMessage(choices[0].message));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startResetChatMessages = () => {
    dispatch(onLoadingopenIA());
    dispatch(onResetChatMessages());
  };

  return {
    //* Atributes
    chatMessages,
    isLoading,
    isAvailableChat,

    //* Functions
    startGetGreetUser,
    startSendingMenssage,
    startResetChatMessages,
  };
};
