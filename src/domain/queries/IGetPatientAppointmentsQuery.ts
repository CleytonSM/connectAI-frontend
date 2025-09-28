import type { TEither } from "../../core/Either";
import type { IQuery } from "../../core/Query";
import type { PatientAppointmentVM } from "../viewmodels/PatientAppoitmentVM";

export interface IGetPatientAppointmentsQueryExecuteParams {
  patientId: number;
}

export interface IGetPatientAppointmentsQuery
  extends IQuery<
    IGetPatientAppointmentsQueryExecuteParams,
    undefined,
    TEither<undefined, PatientAppointmentVM[]>
  > {}
