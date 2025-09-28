import AppointmentList from "./AppointmentList";
import { createGetDoctorConsultsQuery } from "@/factories/createGetDoctorConsultsQuery";
import type { DoctorConsultsVM } from "@/domain/viewmodels/DoctorConsultsVM";
import type { IGetDoctorConsultsQueryExecuteParams } from "@/domain/queries/IGetDoctorConsultsQuery";

const getDoctorConsultsQuery = createGetDoctorConsultsQuery();

async function fetch(
  params: IGetDoctorConsultsQueryExecuteParams,
): Promise<DoctorConsultsVM[] | undefined> {
  const response = await getDoctorConsultsQuery.execute(params);

  if (response.isLeft()) {
    return;
  }

  return structuredClone(response.value);
}

export const StepAppointments = async () => {
  const params: IGetDoctorConsultsQueryExecuteParams = { doctorId: 1 }; // Substitua 1 pelo ID correto.
  const list: DoctorConsultsVM[] | undefined = await fetch(params);

  if (!list) {
    return null;
  }

  return (
    <div className="w-full">
      <AppointmentList list={list} />
    </div> 
  );
};
