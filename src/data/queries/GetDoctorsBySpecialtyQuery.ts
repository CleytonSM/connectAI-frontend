import { type TEither, left, right } from "@/core/Either";
import { mapper } from "../mappers/mapper";
import type {
  IGetDoctorsBySpecialtyQuery,
  IGetDoctorsBySpecialtyQueryExecuteParams,
} from "@/domain/queries/IGetDoctorsBySpecialtyQuery";
import { DoctorVM } from "@/domain/viewmodels/DoctorVM";
import { client } from "../modules/client";
import { parseResponse } from "../modules/ParseResponse";
import { DoctorResponse } from "../models/responses/DoctorResponse";

export class GetDoctorsBySpecialtyQuery implements IGetDoctorsBySpecialtyQuery {
  async execute(
    params: IGetDoctorsBySpecialtyQueryExecuteParams,
  ): Promise<TEither<undefined, DoctorVM[]>> {
    try {
      const response = await client(
        `/consults/doctors/${params.specialty}/${params.patientId}`,
      );

      const { data } = await parseResponse<DoctorResponse[]>(response);

      const mappedData = mapper.mapArray(data, DoctorResponse, DoctorVM);

      return right(mappedData);
    } catch (err) {
      return left(undefined);
    }
  }

  async update() {}
}
