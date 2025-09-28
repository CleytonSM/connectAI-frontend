"use client";

import { SPECIALTIES_OPTIONS } from "@/presentation/data/specialties";
import { useChatMessagesControl } from "@/presentation/hooks/useChatMessagesControl";
import { useScheduleChat } from "@/presentation/hooks/useScheduleChat";
import { ChatMessage } from "../ChatMessage";
import { DateSelector } from "./DateSelector";
import { SpecialtySelector } from "./SpecialtySelector";
import { useCallback, useEffect, useRef } from "react";
import { DoctorSelector } from "./DoctorSelector";
import Button from "../Button";

export const ScheduleAppointmentChat = () => {
  const { messages, addUserMessage, addBotMessage } = useChatMessagesControl();

  const onSuccess = () => {
    window.location.reload();
  };

  const { control, handleSubmit, isValid, isSubmitting } = useScheduleChat({
    onSuccess,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const scrollToBottom = useCallback(
    () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [],
  );

  useEffect(() => {
    if (messages.length > 3) {
      scrollToBottom();
    }
  }, [messages.length, scrollToBottom]);

  const askDate = useCallback(() => {
    addBotMessage({
      type: "bot",
      content: "Perfeito! Em que dia deseja agendar?",
      component: (
        <DateSelector control={control} messageHandler={addUserMessage} />
      ),
    });
  }, [addBotMessage, addUserMessage, control]);

  const askDoctor = useCallback(() => {
    addBotMessage({
      content: "Escolha um dos médicos disponíveis: ",
      component: (
        <DoctorSelector
          control={control}
          messageHandler={addUserMessage}
          nextStep={askDate}
        />
      ),
    });
  }, [addBotMessage, addUserMessage, control, askDate]);

  const askSpecialty = useCallback(() => {
    addBotMessage({
      type: "bot",
      content: "Qual especialidade médica você procura?",
      component: (
        <SpecialtySelector
          control={control}
          messageHandler={addUserMessage}
          specialtyOptions={SPECIALTIES_OPTIONS}
          nextStep={askDoctor}
        />
      ),
    });
  }, [addBotMessage, addUserMessage, control, askDoctor]);

  const initializeChat = useCallback(() => {
    if (initializedRef.current) return;

    addBotMessage({ content: "Olá! 👋 Vou te ajudar a agendar sua consulta." });

    setTimeout(() => {
      askSpecialty();
    }, 800);

    initializedRef.current = true;
  }, [addBotMessage, askSpecialty]);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-[600px] bg-white rounded-lg shadow flex flex-col"
    >
      <div className="bg-green-200 glass text-white p-4 rounded-t-lg">
        <div className="text-green-600">
          <h2 className="font-semibold">Assistente de Agendamento</h2>
          <p className="text-sm">Agendamento Rápido</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
        {isValid && (
          <ChatMessage
            message={{
              id: "submit",
              type: "bot",
              content:
                "Clique em 'Confirmar Agendamento'. Sua lista de agendamentos será atualizada",
              component: (
                <div className="w-full flex flex-col py-4">
                  <Button
                    type="submit"
                    className="rounded-lg"
                    disabled={isSubmitting}
                  >
                    Confirmar Agendamento
                  </Button>
                </div>
              ),
            }}
          />
        )}
      </div>
    </form>
  );
};
