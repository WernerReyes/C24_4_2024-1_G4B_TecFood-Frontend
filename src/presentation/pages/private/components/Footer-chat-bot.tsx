import {
  IconField,
  InputIcon,
  InputText,
  type PanelFooterTemplateOptions,
} from "@/presentation/components";
import clsx from "clsx";

interface PanelFooter extends PanelFooterTemplateOptions {
  setWriteMessage: (writeMessage: string) => void;
  writeMessage: string;
  handleSendMessage: () => void;
}

export const FooterChatBot = ({
  className,
  handleSendMessage,
  writeMessage,
  setWriteMessage,
}: PanelFooter) => {
  return (
    <div
      className={clsx(
        className,
        "flex flex-wrap items-center justify-between gap-3 border-t-2 px-0 dark:border-slate-700",
      )}
    >
      <IconField className="w-full" iconPosition="right">
        <InputIcon
          className="pi pi-send cursor-pointer"
          onClick={handleSendMessage}
        >
          {" "}
        </InputIcon>
        <InputText
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
