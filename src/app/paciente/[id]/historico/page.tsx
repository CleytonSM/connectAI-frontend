import { History } from "lucide-react";
import { PatientHistory } from "@/presentation/components/partials/PatientHistory";

export default function PatientHistoryPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section className="space-y-6 mt-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold flex items-start gap-1">
          <History className="size-8 shrink-0" />
          Histórico de Agendamentos
        </h1>
        <p>Aqui você pode consultar todos os seus agendamentos.</p>
      </div>

      <PatientHistory patientId={params?.id} />
    </section>
  );
}
