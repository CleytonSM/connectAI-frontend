import { type TEither, left, right } from "@/core/Either";
import { mapper } from "../mappers/mapper";
import { client } from "../modules/client";
import { parseResponse } from "../modules/ParseResponse";
import type {
  IGetDoctorsAvailabilityOptionsQuery,
  IGetDoctorsAvailabilityOptionsQueryExecuteParams,
} from "@/domain/queries/IGetDoctorAvailabilityOptionsQuery";
import { DoctorAvailabilityResponse } from "../models/responses/DoctorAvailabilityResponse";
import { DoctorAvailabilityVM } from "@/domain/viewmodels/DoctorAvailabilityVM";

export class GetDoctorAvailabilityOptionsQuery
  implements IGetDoctorsAvailabilityOptionsQuery
{
  async execute(
    params: IGetDoctorsAvailabilityOptionsQueryExecuteParams,
  ): Promise<TEither<undefined, DoctorAvailabilityVM>> {
    try {
      const response = await client(
        `/consults/doctors/${params.doctorId}/availability`,
      );

      const { data } =
        await parseResponse<DoctorAvailabilityResponse>(response);

      const mappedData = mapper.map(
        data,
        DoctorAvailabilityResponse,
        DoctorAvailabilityVM,
      );

      return right(mappedData);
    } catch (err) {
      return left(undefined);
    }
  }

  async update() {}
}
