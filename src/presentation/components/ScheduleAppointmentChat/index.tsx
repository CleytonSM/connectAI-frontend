"use client";
import type { DoctorVM } from "@/domain/viewmodels/DoctorVM";
import type { IScheduleAppointmentChatMessage } from "@/presentation/@types/ScheduleAppointmentChat";
import { SPECIALTIES_OPTIONS } from "@/presentation/data/specialties";
import { Bot, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScheduleChat } from "../../hooks/useScheduleChat";
import { DateSelector } from "./DateSelector";
import { DoctorSelector } from "./DoctorSelector";
import { SpecialtySelector } from "./SpecialtySelector";

const medicos: DoctorVM[] = [
  {
    id: "1",
    name: "Dr. João Silva",
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
  },
];

export const ScheduleAppointmentChat = () => {
  const onSuccess = () => {
    addBotMessage("✅ Agendamento confirmado com sucesso!");
  };

  const { control, handleSubmit } = useScheduleChat({ onSuccess });

  const [messages, setMessages] = useState<IScheduleAppointmentChatMessage[]>(
    [],
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(
    () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [],
  );

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const addMessage = useCallback(
    (msg: Omit<IScheduleAppointmentChatMessage, "id">) =>
      setMessages((prev) => [
        ...prev,
        { ...msg, id: crypto.randomUUID?.() ?? String(Date.now()) },
      ]),
    [],
  );

  const addBotMessage = useCallback(
    (text: string) => addMessage({ type: "bot", content: text }),
    [addMessage],
  );

  const addUserMessage = useCallback(
    (text: string) => addMessage({ type: "user", content: text }),
    [addMessage],
  );

  const finalizar = useCallback(() => {
    addBotMessage("Perfeito! Aqui está o resumo do seu agendamento:");
    addMessage({
      type: "bot",
      component: (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mt-2 text-sm">
          resumo
          <button
            type="submit"
            className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Confirmar Agendamento
          </button>
        </div>
      ),
    });
  }, [addBotMessage, addMessage]);

  const askDoctor = useCallback(() => {
    addBotMessage(`Encontrei médicos disponíveis. Escolha um:`);
    addMessage({
      type: "bot",
      component: (
        <DoctorSelector
          control={control}
          doctors={medicos}
          messageHandler={addUserMessage}
          nextStep={finalizar}
        />
      ),
    });
  }, [addBotMessage, addMessage, addUserMessage, control, finalizar]);

  const askDate = useCallback(() => {
    addBotMessage(`Perfeito! Para , em que dia deseja agendar?`);
    addMessage({
      type: "bot",
      component: (
        <DateSelector
          control={control}
          messageHandler={addUserMessage}
          nextStep={askDoctor}
        />
      ),
    });
  }, [addBotMessage, addUserMessage, control, addMessage, askDoctor]);

  const askSpecialty = useCallback(() => {
    addBotMessage("Qual especialidade médica você procura?");
    addMessage({
      type: "bot",
      component: (
        <SpecialtySelector
          control={control}
          messageHandler={addUserMessage}
          specialtyOptions={SPECIALTIES_OPTIONS}
          nextStep={askDate}
        />
      ),
    });
  }, [addBotMessage, addMessage, addUserMessage, control, askDate]);

  // mensagens iniciais

  useEffect(() => {
    addBotMessage("Olá! 👋 Vou te ajudar a agendar sua consulta.");
    setTimeout(() => askSpecialty(), 800);
  }, [addBotMessage, askSpecialty]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-[600px] bg-white rounded-lg shadow flex flex-col"
    >
      {/* Header */}
      <div className="bg-gray-500 glass text-white p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold">Assistente de Agendamento</h2>
            <p className="text-sm text-blue-100">Agendamento Rápido</p>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.type === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === "bot"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {msg.type === "bot" ? (
                <Bot className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div className="w-full">
              {msg.content && (
                <div
                  className={`inline-block p-3 rounded-lg text-sm ${
                    msg.type === "bot"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              )}
              {msg.component && <div className="mt-2">{msg.component}</div>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </form>
  );
};
