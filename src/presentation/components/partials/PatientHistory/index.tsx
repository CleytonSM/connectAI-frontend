import { createGetPatientAppointmentsQuery } from "@/factories/createGetPatientAppointments";
import { List } from "./List";

const getPatientAppointments = createGetPatientAppointmentsQuery();

async function getPatientAppointmentsList(patientId: number) {
  const response = await getPatientAppointments.execute({
    patientId,
  });

  if (response.isLeft()) {
    return null;
  }

  return structuredClone(response.value);
}

interface IPatientHistoryProps {
  patientId: string;
}

export const PatientHistory = async ({ patientId }: IPatientHistoryProps) => {
  const patientIdNumber = Number.parseInt(patientId);

  if (!patientIdNumber) return;

  const appointment = await getPatientAppointmentsList(patientIdNumber);

  if (!appointment) {
    return (
      <div className="border rounded p-4 bg-gray-50">
        <p>Nenhum agendamento cadastrado.</p>
      </div>
    );
  }

  return <List appointments={appointment} />;
};
