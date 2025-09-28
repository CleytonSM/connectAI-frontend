"use client";
import { Clock } from "lucide-react";
import StepAppointments from "@/presentation/components/StepAppointments/AppointmentList";

export default function DoctorAgendaPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Clock size={28} className="text-green-500" /> Agenda
      </h1>
      <p className="text-base text-gray-500 mb-6">
        Visualize os atendimentos do dia, seus pacientes e horários
      </p>
      <div className="flex mt-8">
        <StepAppointments />
      </div>
    </main>
  );
}
