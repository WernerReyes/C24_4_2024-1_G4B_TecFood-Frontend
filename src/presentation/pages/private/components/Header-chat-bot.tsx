import { type PanelHeaderTemplateOptions } from "@/presentation/components";
import clsx from "clsx";

interface PanelHeader extends PanelHeaderTemplateOptions {
  setShowChatBot: (showChatBot: boolean) => void;
}

export const HeaderChatBot = ({ className, setShowChatBot }: PanelHeader) => {
  return (
    <div
      className={clsx(className, "justify-content-space-between bg-primary")}
    >
      <div className="flex w-full items-center justify-between gap-2  text-white">
        <span className="font-bold">Chatbot</span>
        <i
          onClick={() => setShowChatBot(false)}
          className="pi pi-times cursor-pointer"
        ></i>
      </div>
    </div>
  );
};
