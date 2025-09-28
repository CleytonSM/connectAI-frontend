import type { TFactory } from "@/core/Factory";
import { GetPatientAppointmentsQuery } from "@/data/queries/GetPatientAppointmentsQuery";

export const createGetPatientAppointmentsQuery: TFactory<
  GetPatientAppointmentsQuery
> = () => {
  return new GetPatientAppointmentsQuery();
};
