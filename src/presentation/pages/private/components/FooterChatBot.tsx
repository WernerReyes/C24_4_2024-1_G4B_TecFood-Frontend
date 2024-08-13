import clsx from "clsx";
import {
  IconField,
  InputIcon,
  InputText,
  type PanelFooterTemplateOptions,
} from "@/presentation/core/components";

interface PanelFooter extends PanelFooterTemplateOptions {
  setWriteMessage: (writeMessage: string) => void;
  writeMessage: string;
  handleSendMessage: () => void;
  isAvailableChat: boolean;
}

export const FooterChatBot = ({
  className,
  handleSendMessage,
  writeMessage,
  setWriteMessage,
  isAvailableChat
}: PanelFooter) => {
  return (
    <div
      className={clsx(
        className,
        "flex flex-wrap items-center justify-between gap-3 border-t-2 px-0 dark:border-slate-700",
      )}
    >
      <IconField
        disabled={!isAvailableChat}
        className="w-full"
        iconPosition="right"
      >
        <InputIcon
          className={clsx("pi pi-send disabled:bg-red-500", 
          isAvailableChat ? "cursor-pointer" : "cursor-not-allowed"
          )}
          onClick={handleSendMessage}
          disabled={!isAvailableChat}
        />
        <InputText
          disabled={!isAvailableChat}
          className="bg-trasparent max-w-72 border-none text-xs shadow-none dark:bg-transparent"
          v-model="value1"
          value={writeMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          onChange={(e) => setWriteMessage(e.target.value)}
          placeholder="Escribe un mensaje"
        />
      </IconField>
    </div>
  );
};
