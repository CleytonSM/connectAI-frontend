"use client";
import React, { useState } from "react";
import { Eye, Clock } from "lucide-react";
import { Table } from "@/presentation/components/Table";
import { Modal } from "@/presentation/components/Modal";

export default function DoctorAgendaPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock de atendimentos, simula dados vindos do backend
  const atendimentos = [
    {
      id: 1,
      paciente: "João Silva",
      horario: "09:00",
      descricao: "Consulta de rotina",
    },
    {
      id: 2,
      paciente: "Maria Souza",
      horario: "10:30",
      descricao: "Retorno de exames",
    },
    // Adicione mais objetos conforme necessário
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<any | null>(
    null,
  );

  const handleOpenModal = (consulta: any) => {
    setConsultaSelecionada(consulta);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setConsultaSelecionada(null);
  };

  return (
    <main className="p-8">
      <div className="mb-4 flex items-center gap-3">
        <Clock className="w-8 h-8" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-700 leading-tight">
            Agenda Diária do Médico
          </h1>
          <p className="text-base text-gray-500">
            Visualize e gerencie os atendimentos do dia
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Table
          columns={[
            { key: "horario", header: "Horário" },
            { key: "paciente", header: "Paciente" },
            { key: "descricao", header: "Descrição" },
            {
              key: "id",
              header: "Ações",
              render: (_: any, row: any) => (
                <div className="flex gap-2">
                  <button
                    type="button"
                    title="Visualizar atendimento"
                    className="p-1 hover:bg-base-200 rounded"
                    onClick={() => handleOpenModal(row)}
                  >
                    <Eye className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
              ),
            },
          ]}
          data={atendimentos}
        />
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title="Detalhes da Consulta"
      >
        {consultaSelecionada && (
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Paciente:</span>{" "}
              {consultaSelecionada.paciente}
            </div>
            <div>
              <span className="font-semibold">Horário:</span>{" "}
              {consultaSelecionada.horario}
            </div>
            <div>
              <span className="font-semibold">Descrição:</span>{" "}
              {consultaSelecionada.descricao}
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
