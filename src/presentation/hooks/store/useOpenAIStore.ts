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

const openAIService = new OpenAIService();
const openAIRepositoryImpl = new OpenAIRepositoryImpl(openAIService);

export const useOpenAIStore = () => {
  const dispatch = useDispatch();
  const { chatMessages, isLoading, isAvailableChat } = useSelector(
    (state: AppState) => state.openAI,
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

  const startSendingMenssage = async (chatDto: ChatDto) => {
    chatDto.validate();

    dispatch(onLoadingopenIA());
    dispatch(onAddChatMessage(chatDto.messages[chatDto.messages.length - 1]));
    openAIRepositoryImpl
      .chat(chatDto)
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
