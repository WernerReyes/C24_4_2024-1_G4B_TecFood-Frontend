import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import clsx from "clsx";
import { ChatDto } from "@/domain/dtos";
import { OpenAIRoleEnum } from "@/domain/entities";
import {
  ChangeTheme,
  Image,
  Panel,
  ScrollPanel,
  SpinnerMessage,
} from "@/presentation/components";
import { useOpenAIStore } from "@/presentation/hooks";
import { ChatBotResponse, FooterChatBot, HeaderChatBot } from "./";

type Props = {
  to: string;
  offset?: number;
  duration?: number;
};

export const ChatBot = ({ to, offset = 50, duration = 1000 }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { startGetGreetUser, startSendingMenssage, chatMessages } =
    useOpenAIStore();
  const [writeMessage, setWriteMessage] = useState<string>("");
  const [showChatBot, setShowChatBot] = useState(false);
  const [addedMessage, setAddedMessage] = useState<boolean>(false);

  const handleLoadGreetUser = async () => {
    setAddedMessage(true);
    startGetGreetUser().then(() => {
      setAddedMessage(false);
    });
  };

  const handleSendMessage = async () => {
    setAddedMessage(true);
    const chatDto = ChatDto.create({
      messages: [
        ...chatMessages,
        { role: OpenAIRoleEnum.USER, content: writeMessage },
      ],
    });
    startSendingMenssage(chatDto).then(() => {
      setAddedMessage(false);
    });

    setWriteMessage("");
  };

  useEffect(() => {
    handleLoadGreetUser();
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <>
      <div className="relative">
        <Image
          src="/user/chatbot.png"
          alt="chatbot"
          className="fixed bottom-4 right-2 z-50 w-28 animate-float cursor-pointer shadow-sm"
          onClick={() => setShowChatBot(!showChatBot)}
        />
      </div>
      <Panel
        className={clsx(
          showChatBot ? "block" : "hidden",
          "fixed bottom-4 right-4 z-[99] h-96 w-80 rounded-lg border-2 border-primary bg-white shadow-lg dark:bg-slate-800",
        )}
        headerTemplate={(options) => (
          <HeaderChatBot {...options} setShowChatBot={setShowChatBot} />
        )}
        footerTemplate={(options) => (
          <FooterChatBot
            {...options}
            setWriteMessage={setWriteMessage}
            handleSendMessage={handleSendMessage}
            writeMessage={writeMessage}
          />
        )}
        toggleable
      >
        <ScrollPanel className="h-56 p-2">
          {chatMessages.map((message, index) => {
            const isLastMessage = chatMessages.length - 1 === index;
            if (message.role === OpenAIRoleEnum.USER) {
              return (
                <div
                  key={index}
                  className="mb-5 flex justify-end"
                  ref={isLastMessage ? lastMessageRef : null}
                >
                  <div className="flex w-48 max-w-48 flex-col rounded-lg bg-primary p-2">
                    <span className="text-xs">{message.content}</span>
                  </div>
                </div>
              );
            }

            const sanitizedContent = DOMPurify.sanitize(message.content);

            return (
              <ChatBotResponse
                key={index}
                ref={isLastMessage ? lastMessageRef : null}
              >
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
              </ChatBotResponse>
            );
          })}
          {addedMessage && (
            <ChatBotResponse ref={lastMessageRef}>
              <SpinnerMessage />
            </ChatBotResponse>
          )}
        </ScrollPanel>
      </Panel>
      <ChangeTheme
        to={to}
        offset={offset}
        duration={duration}
        className="bottom-4 right-4 z-50"
      />
    </>
  );
};
