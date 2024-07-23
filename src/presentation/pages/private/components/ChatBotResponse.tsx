import { Avatar } from "@/presentation/core/components";
import { forwardRef } from "react";


type Props = {
  children?: React.ReactNode;
};

export const ChatBotResponse = forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    return (
      <div className="mb-5 flex items-end gap-2" ref={ref}>
        <div className="flex-shrink-0">
          <Avatar
            image="/user/chatbot.png"
            className="h-9 w-9 rounded-full border-2 border-primary bg-primary"
          />
        </div>
        <div className="flex max-w-52 flex-col rounded-lg bg-skeleton p-2 text-xs dark:bg-skeleton-darker">
          {children}
        </div>
      </div>
    );
  },
);
