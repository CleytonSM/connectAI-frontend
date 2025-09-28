import clsx from "clsx";
import { Bot, User } from "lucide-react";
import type { IChatMessage } from "../@types/ChatMessage";

interface IChatMessageProps {
  message: IChatMessage;
}

export const ChatMessage = ({ message }: IChatMessageProps) => {
  return (
    <div
      className={clsx("flex items-start gap-3", {
        "items-end flex-row-reverse justify-start": message.type === "user",
      })}
    >
      <div
        className={clsx(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          {
            "bg-green-200 text-green-600": message.type === "bot",
            "bg-gray-900 text-gray-200": message.type === "user",
          },
        )}
      >
        {message.type === "bot" ? (
          <Bot className="w-5 h-5" />
        ) : (
          <User className="w-5 h-5" />
        )}
      </div>
      <div>
        {message.content && (
          <div
            className={clsx("inline-block p-3 rounded-lg text-sm", {
              "bg-gray-100 text-gray-800": message.type === "bot",
              "bg-gray-900 text-gray-200": message.type === "user",
            })}
          >
            {message.content}
          </div>
        )}
        {message.component && <div className="mt-2">{message.component}</div>}
      </div>
    </div>
  );
};
