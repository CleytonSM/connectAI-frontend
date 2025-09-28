import { type TEither, left, right } from "@/core/Either";
import { mapper } from "../mappers/mapper";
import type {
  IGetPatientAppointmentsQuery,
  IGetPatientAppointmentsQueryExecuteParams,
} from "@/domain/queries/IGetPatientAppointmentsQuery";
import { client } from "../modules/client";
import { parseResponse } from "../modules/ParseResponse";
import { PatientAppointmentResponse } from "../models/responses/PatientAppoitmentResponse";
import { PatientAppointmentVM } from "@/domain/viewmodels/PatientAppoitmentVM";

export class GetPatientAppointmentsQuery
  implements IGetPatientAppointmentsQuery
{
  async execute(
    params: IGetPatientAppointmentsQueryExecuteParams,
  ): Promise<TEither<undefined, PatientAppointmentVM[]>> {
    try {
      const response = await client(
        `/consults/patient/${params.patientId}/all`,
      );

      const { data } =
        await parseResponse<PatientAppointmentResponse[]>(response);

      const mappedData = mapper.mapArray(
        data,
        PatientAppointmentResponse,
        PatientAppointmentVM,
      );

      return right(mappedData);
    } catch (error) {
      return left(undefined);
    }
  }

  async update() {}
}
