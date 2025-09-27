"use client";
import { Table, TableColumn } from "@/presentation/components/Table";
import Button from "@/presentation/components/Button";
import { Eye, Stethoscope } from "lucide-react";

const examesMock = [
  {
    id: 1,
    nome: "Cecília Nair Silva",
    dataNascimento: "10/02/1954",
    data: "11/08/2025",
    exames:
      "Hemoglobina glicada (A1 total) - pesquisa e/ou dosagem, Bilirrubinas (direta, indireta e total) - pesquisa e/ou dosagem, Magnésio - pesquisa e/ou dosagem",
    acoes: "",
  },
  {
    id: 2,
    nome: "João Souza",
    dataNascimento: "05/07/1970",
    data: "10/08/2025",
    exames: "Colesterol total - dosagem, Triglicerídeos - dosagem",
    acoes: "",
  },
  {
    id: 3,
    nome: "Alysson Souza",
    dataNascimento: "05/07/1970",
    data: "10/08/2025",
    exames: "Colesterol total alto - dosagem, Triglicerídeos - dosagem",
    acoes: "",
  },
];

const columns: TableColumn<(typeof examesMock)[0]>[] = [
  { key: "nome", header: "Nome" },
  { key: "dataNascimento", header: "Data de Nascimento" },
  { key: "data", header: "Data" },
  {
    key: "exames",
    header: "Exames Laboratoriais",
    render: (value: string | number) => String(value),
  },
  {
    key: "acoes",
    header: "Ações",
    render: (_value, row) => (
      <Button
        type="button"
        title="Visualizar"
        onClick={() => alert(`Visualizar exames de ${row.nome}`)}
      >
        <Eye size={20} />
      </Button>
    ),
  },
];

const data = examesMock;

export default function DoctorAgendaPage() {
  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Stethoscope size={28} className="text-blue-500" /> Exames
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
