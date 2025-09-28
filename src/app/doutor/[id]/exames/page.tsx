"use client";
import type { TableColumn } from "@/presentation/components/Table";
import { Table } from "@/presentation/components/Table";
import Button from "@/presentation/components/Button";
import { Eye, Stethoscope } from "lucide-react";
import { useState, useEffect } from "react";
import { Modal } from "@/presentation/components/Modal";

interface DocumentData {
  id: number;
  patient?: {
    name?: string;
    email?: string;
    cpf?: string;
  };
  doctor?: {
    name?: string;
    specialty?: string;
  };
  path?: string;
  name: string;
  createdAt?: string;
  status?: string;
  acoes?: string;
}

const formatStatus = (status?: string) => {
  switch (status) {
    case "approved":
      return "Aprovado";
    case "reviewing":
      return "Em revisão";
    default:
      return "Desconhecido";
  }
};

const columns = (
  onView: (row: DocumentData) => void,
): TableColumn<DocumentData>[] => [
  {
    key: "patient",
    header: "Paciente",
    render: (value) => {
      if (typeof value === "object" && value?.name) {
        return value.name;
      }
      return "Não informado";
    },
  },
  { key: "name", header: "Nome do Exame" },
  {
    key: "status",
    header: "Status",
    render: (value) => {
      if (typeof value === "string") {
        return formatStatus(value);
      }
      return formatStatus(undefined);
    },
  },
  {
    key: "acoes",
    header: "Ações",
    render: (_value, row) => (
      <Button type="button" title="Visualizar" onClick={() => onView(row)}>
        <Eye size={20} />
      </Button>
    ),
  },
];

export default function DoctorAgendaPage() {
  const [data, setData] = useState<DocumentData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem("user-data");
        const parsedData = userData ? JSON.parse(userData) : null;
        const userId = parsedData?.id;

        if (!userId) {
          console.error("User ID not found in localStorage.");
          return;
        }

        const response = await fetch(
          `https://hackaton-api-production-a002.up.railway.app/api/documents/doctors/${userId}`,
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleView = (row: DocumentData) => {
    setSelected(row);
    setIsOpen(true);
  };

  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Stethoscope size={28} className="text-green-500" /> Exames
      </h1>
      <div className="mt-6">
        <Table
          columns={columns(handleView)}
          data={data}
          className="bg-white border border-gray-200 rounded shadow-md min-w-full"
          rowKey={(row) => row.id}
        />
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelected(null);
        }}
        title={selected ? `Exame — ${selected.name}` : undefined}
      >
        {selected ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              <strong>Paciente:</strong>{" "}
              {selected.patient?.name || "Não informado"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email do Paciente:</strong>{" "}
              {selected.patient?.email || "Não informado"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>CPF do Paciente:</strong>{" "}
              {selected.patient?.cpf || "Não informado"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Nome do Exame:</strong> {selected.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {formatStatus(selected.status)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Médico:</strong>{" "}
              {selected.doctor?.name || "Não informado"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Caminho do Documento:</strong>{" "}
              {selected.path || "Não informado"}
            </p>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </Modal>
    </main>
  );
}
