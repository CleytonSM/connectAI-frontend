import { useForm } from "react-hook-form";
import { type IOrionSchema, OrionSchema } from "../schemas/orionSchema";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useChatMessagesControl } from "./useChatMessagesControl";
import { createSendOrionMessageCommand } from "@/factories/createSendOrionMessageCommand";

const sendMessageToAPI = createSendOrionMessageCommand();

export const useOrion = () => {
  const { messages, addUserMessage, addBotMessage } = useChatMessagesControl();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IOrionSchema>({
    resolver: valibotResolver(OrionSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: IOrionSchema) => {
    if (!data.message.trim()) return;

    addUserMessage({ content: data.message });

    reset();

    const response = await sendMessageToAPI.execute({ message: data.message });

    if (response.isLeft()) {
      addBotMessage({
        content:
          "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
      });

      return;
    }

    addBotMessage({
      content: response.value.response,
    });
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
    messages,
    addBotMessage,
    addUserMessage,
  };
};
