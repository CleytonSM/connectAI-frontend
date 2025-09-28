import { createGetPatientAppointmentsQuery } from "@/factories/createGetPatientAppointments";
import { List } from "./List";

const getPatientAppointments = createGetPatientAppointmentsQuery();

async function getPatientNextAppointments(patientId: number) {
  const response = await getPatientAppointments.execute({
    patientId,
  });

  if (response.isLeft()) {
    return null;
  }

  const nextAppointments = response.value.filter(
    (appointment) => !appointment.hasHappened,
  );

  return structuredClone(nextAppointments);
}

interface IPatientAgendaProps {
  patientId: string;
}

export const PatientAgenda = async ({ patientId }: IPatientAgendaProps) => {
  const patientIdNumber = Number.parseInt(patientId);

  if (!patientIdNumber) return;

  const nextAppointments = await getPatientNextAppointments(patientIdNumber);

  if (!nextAppointments) {
    return (
      <div className="border rounded p-4 bg-gray-50">
        <p>Nenhum agendamento cadastrado.</p>
      </div>
    );
  }

  return <List appointments={nextAppointments} />;
};
