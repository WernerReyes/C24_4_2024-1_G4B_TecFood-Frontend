import { ChatDto } from "@/domain/dtos";
import { Chat, GreetUser } from "@/domain/use-cases";
import { OpenAIRepositoryImpl } from "@/infraestructure/repositories";
import { OpenAIService } from "@/infraestructure/services";
import {
  onAddChatMessage,
  onLoadChatMessages,
  onLoadingopenIA,
  onResetChatMessages,
  type AppState,
} from "@/infraestructure/store";
import { getStorage } from "@/presentation/utilities";
import { useDispatch, useSelector } from "react-redux";
import { useMessage } from "../useMessage";

const openAIService = new OpenAIService();
const openAIRepositoryImpl = new OpenAIRepositoryImpl(openAIService);

export const useOpenAIStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages, typeError } = useMessage();
  const { chatMessages, isLoading } = useSelector(
    (state: AppState) => state.openIA,
  );

  const startGetGreetUser = async () => {
    dispatch(onLoadingopenIA());

    if (getStorage("chatMessages"))
      return dispatch(onLoadChatMessages(getStorage("chatMessages")!));

    await new GreetUser(openAIRepositoryImpl)
      .execute()
      .then(({ choices }) => {
        dispatch(onAddChatMessage(choices[0].message));
      })
      .catch((error) => {
        throw error;
      });
  };

  const startSendingMenssage = async (chatDto: [ChatDto?, string[]?]) => {
    const [validatedData, errors] = chatDto;
    if (errors) return startSetMessages(errors, typeError);
    dispatch(
      onAddChatMessage(
        validatedData?.messages[validatedData.messages.length - 1]!,
      ),
    );

    dispatch(onLoadingopenIA());

    await new Chat(openAIRepositoryImpl)
      .execute(validatedData!)
      .then(({ choices }) => {
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

    //* Functions
    startGetGreetUser,
    startSendingMenssage,
    startResetChatMessages,
  };
};
