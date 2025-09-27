import React from "react";

export default function DoctorAgendaPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Exames</h1>
      <p>Médico ID: {params.id}</p>
      {/* Aqui você pode adicionar a tabela de horários, consultas, etc. */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Consultas</h2>
        <div className="border rounded p-4 bg-gray-50">
          <p>Nenhuma consulta cadastrada.</p>
        </div>
      </div>
    </main>
  );
}
