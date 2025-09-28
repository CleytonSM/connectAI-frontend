"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { Send } from "lucide-react";
import { ChatMessage } from "../ChatMessage";
import Button from "../Button";
import Input from "../Input";
import { Controller } from "react-hook-form";
import { useOrion } from "@/presentation/hooks/useOrion";

export const OrionChatbot = () => {
  const { control, handleSubmit, isSubmitting, messages, addBotMessage } =
    useOrion();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  const scrollToBottom = useCallback(
    () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [],
  );

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [scrollToBottom, messages.length]);

  const initializeChat = useCallback(() => {
    if (initializedRef.current) return;

    addBotMessage({
      content:
        "Olá! 👋 Eu sou Orion, seu assistente de saúde virtual do VitaLink. Como posso te ajudar hoje? Você pode me perguntar sobre agendamentos, autorizações ou qualquer outra dúvida sobre seu plano.",
    });

    initializedRef.current = true;
  }, [addBotMessage]);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full flex flex-col items-center justify-center w-full"
    >
      <div className="flex-1 w-full space-y-4 text-black h-full overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="w-full min-h-10 flex items-center justify-center">
        <div className="flex-1 flex items-center gap-2">
          <Controller
            name="message"
            control={control}
            rules={{
              required: "Por favor, digite uma mensagem",
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="text"
                placeholder="Faça uma pergunta..."
                className="input input-neutral"
                invalid={!!fieldState.error}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed btn-neutral"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};
