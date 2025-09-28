"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useChatMessagesControl } from "@/presentation/hooks/useChatMessagesControl";
import { ChatMessage } from "../ChatMessage";
import type { DoctorConsultsResponse } from "@/data/models/responses/DoctorConsultsResponse";

export const DocumentValidationChat = () => {
  const { messages, addUserMessage, addBotMessage } = useChatMessagesControl();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [patients, setPatients] = useState<{ id: string; name: string }[]>([]);
  const [messageAdded, setMessageAdded] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!messageAdded) {
      addBotMessage({
        content:
          "Por favor, selecione um paciente antes de enviar o exame para avaliação.",
      });
      setMessageAdded(true);
    }
  }, [addBotMessage, messageAdded]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const doctorId = JSON.parse(
          localStorage.getItem("user-data") || "{}",
        ).id;
        const response = await fetch(
          `https://hackaton-api-production-a002.up.railway.app/api/consults/doctors/${doctorId}/all`,
        );

        if (response.ok) {
          const data: DoctorConsultsResponse[] = await response.json(); // Explicitly type the response
          const patientData = data.map((consult) => ({
            id: consult.patient.id.toString(),
            name: consult.patient.name,
          }));

          const uniquePatients = Array.from(
            new Map(
              patientData.map((patient) => [patient.id, patient]),
            ).values(),
          );

          setPatients(uniquePatients);
        } else {
          console.error("Failed to fetch patients.");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSendMessage = async (file: File) => {
    if (!file) return;

    addUserMessage({ content: `Arquivo enviado: ${file.name}` });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const doctorId = JSON.parse(localStorage.getItem("user-data") || "{}").id;

      const response = await fetch(
        `https://hackaton-api-production-a002.up.railway.app/api/documents/upload/${selectedPatient}/${doctorId}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        addBotMessage({ content: "O exame foi enviado com sucesso." });
      } else {
        throw new Error("Erro ao enviar o exame.");
      }
    } catch {
      addBotMessage({
        content: "Houve um problema ao enviar o exame. Tente novamente.",
      });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow flex flex-col">
      <div className="bg-green-200 text-green-600 p-4 rounded-t-lg">
        <h2 className="font-semibold">Validação de Exames</h2>
        <p className="text-sm">Chat para validação de documentos</p>
      </div>

      <div className="p-4">
        <label
          htmlFor="patient-select"
          className="block text-sm font-medium text-gray-700"
        >
          Selecione o paciente:
        </label>
        <select
          id="patient-select"
          value={selectedPatient || ""}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-lg"
        >
          <option value="" disabled>
            Escolha um paciente
          </option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 flex items-center space-x-2">
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && selectedPatient) {
              handleSendMessage(file);
            } else if (!selectedPatient) {
              addBotMessage({
                content:
                  "Por favor, selecione um paciente antes de enviar o arquivo.",
              });
            }
          }}
          className="hidden"
          disabled={!selectedPatient}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          disabled={!selectedPatient}
        >
          Escolher Arquivo
        </button>
      </div>
    </div>
  );
};
