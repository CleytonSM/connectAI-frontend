import { useCallback, useState } from "react";
import type { IChatMessage } from "../@types/ChatMessage";

export const useChatMessagesControl = () => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const addMessage = useCallback(
    (msg: Omit<IChatMessage, "id">) =>
      setMessages((prev) => [
        ...prev,
        { ...msg, id: crypto.randomUUID?.() ?? String(Date.now()) },
      ]),
    [],
  );

  const addBotMessage = useCallback(
    (msg: Partial<IChatMessage>) => addMessage({ type: "bot", ...msg }),
    [addMessage],
  );

  const addUserMessage = useCallback(
    (msg: Partial<IChatMessage>) => addMessage({ type: "user", ...msg }),
    [addMessage],
  );

  return {
    messages,
    addBotMessage,
    addUserMessage,
  };
};
