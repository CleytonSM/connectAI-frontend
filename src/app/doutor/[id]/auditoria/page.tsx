"use client";
import { Table } from "@/presentation/components/Table";
import type { TableColumn } from "@/presentation/components/Table";
import Button from "@/presentation/components/Button";
import { Glasses, Check, X } from "lucide-react";
import { useState, useEffect } from "react";

interface DocumentData {
  id: number;
  patient?: {
    id?: number; // Adicionado para corrigir o erro
    name?: string;
  };
  name: string;
  createdAt?: string;
  status?: string;
  acoes?: string;
}

export default function DoctorAuditPage() {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loadingAction, setLoadingAction] = useState(false); // Novo estado para evitar múltiplas requisições

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem("user-data");
        const userId = userData ? JSON.parse(userData).id : null;

        if (!userId) {
          console.error("User ID not found in localStorage.");
          return;
        }

        const response = await fetch(
          `https://hackaton-api-production-a002.up.railway.app/api/documents/doctors/${userId}`,
        );
        const result = await response.json();
        const filteredData = result.filter(
          (item: DocumentData) => item.status === "reviewing",
        );
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAction = async (
    hasHappened: boolean,
    patientId: number,
    documentId: number,
  ) => {
    if (loadingAction) return; // Evita múltiplas requisições

    setLoadingAction(true);
    try {
      const userData = localStorage.getItem("user-data");
      const userId = userData ? JSON.parse(userData).id : null;

      if (!userId) {
        console.error("User ID not found in localStorage.");
        alert("Erro: ID do usuário não encontrado.");
        return;
      }

      const response = await fetch(
        `https://hackaton-api-production-a002.up.railway.app/api/consults/${documentId}?hasHappened=${hasHappened ? "true" : "false"}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId, doctorId: userId }),
        },
      );

      if (response.status === 204) {
        alert(`Ação realizada com sucesso!`);
      } else {
        const errorDetails = await response.text();
        console.error("Erro ao realizar a ação", {
          status: response.status,
          statusText: response.statusText,
          body: errorDetails,
        });
        alert("Erro ao realizar a ação.");
      }
    } catch (error) {
      console.error("Erro ao realizar a ação", error);
      alert("Erro ao realizar a ação.");
    } finally {
      setLoadingAction(false); // Libera o botão após a requisição
    }
  };

  const columns: TableColumn<DocumentData>[] = [
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
      key: "acoes",
      header: "Ações",
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            type="button"
            title="Autorizar"
            aria-label={`Autorizar solicitação de ${row.name}`}
            onClick={() => handleAction(true, row.patient?.id || 0, row.id)}
            className="p-2 rounded-md bg-transparent hover:bg-gray-100"
            disabled={loadingAction} // Desabilita o botão enquanto carrega
          >
            <Check size={16} className="text-green-500" />
          </Button>
          <Button
            type="button"
            title="Negar"
            aria-label={`Negar solicitação de ${row.name}`}
            onClick={() => handleAction(false, row.patient?.id || 0, row.id)}
            className="p-2 rounded-md bg-transparent hover:bg-gray-100"
            disabled={loadingAction} // Desabilita o botão enquanto carrega
          >
            <X size={16} className="text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Glasses size={28} className="text-green-500" /> Auditoria
      </h1>
      <div className="mt-6">
        <Table
          columns={columns}
          data={data}
          className="bg-white border border-gray-200 rounded shadow-md min-w-full"
          rowKey={(row) => row.id}
        />
      </div>
    </main>
  );
}
