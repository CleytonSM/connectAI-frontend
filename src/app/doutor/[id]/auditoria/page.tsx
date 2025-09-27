"use client";

import { Table } from "@/presentation/components/Table";
import type { TableColumn } from "@/presentation/components/Table";
import Button from "@/presentation/components/Button";
import { Glasses, Check, X } from "lucide-react";

const auditoriaMock = [
  {
    id: 1,
    nome: "Cecília Nair Silva",
    data: "11/08/2025",
    descricao: "Solicitação de autorização para exame de imagem",
    acoes: "",
  },
  {
    id: 2,
    nome: "João Souza",
    data: "10/08/2025",
    descricao: "Solicitação de autorização para cirurgia",
    acoes: "",
  },
];

const columns: TableColumn<{
  id: number;
  nome: string;
  data: string;
  descricao: string;
  acoes: string;
}>[] = [
  { key: "nome", header: "Nome" },
  { key: "data", header: "Data" },
  { key: "descricao", header: "Descrição" },
  {
    key: "acoes",
    header: "Ações",
    render: (_, row) => (
      <div className="flex gap-2">
        <Button
          type="button"
          title="Autorizar"
          aria-label={`Autorizar solicitação de ${row.nome}`}
          onClick={() => alert(`Autorizar solicitação de ${row.nome}`)}
          className="p-2 rounded-md bg-transparent hover:bg-gray-100"
        >
          <Check size={16} className="text-green-500" />
        </Button>
        <Button
          type="button"
          title="Negar"
          aria-label={`Negar solicitação de ${row.nome}`}
          onClick={() => alert(`Negar solicitação de ${row.nome}`)}
          className="p-2 rounded-md bg-transparent hover:bg-gray-100"
        >
          <X size={16} className="text-red-500" />
        </Button>
      </div>
    ),
  },
];

export default function DoctorAuditPage() {
  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Glasses size={28} className="text-red-500" /> Auditoria
      </h1>
      <div className="mt-6">
        <Table
          columns={columns}
          data={auditoriaMock}
          className="bg-white border border-gray-200 rounded shadow-md min-w-full"
          rowKey={(row) => row.id}
        />
      </div>
    </main>
  );
}
