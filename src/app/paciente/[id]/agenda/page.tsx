import { Calendar } from "lucide-react";
import { ScheduleAppointmentChat } from "@/presentation/components/ScheduleAppointmentChat";
import { PatientAgenda } from "@/presentation/components/partials/PatientAgenda";

export default function DoctorAgendaPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="space-y-6 mt-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold flex items-center gap-1">
          <Calendar className="size-8 shrink-0" />
          Agenda
        </h1>
        <p>
          Aqui você pode consultar seus próximos agendamentos e agendar uma
          consulta com o <strong>Assistente de Agendamento!</strong>
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Próximos agendamentos</h2>
        <PatientAgenda patientId={params?.id} />
      </div>

      <ScheduleAppointmentChat />
    </main>
  );
}
