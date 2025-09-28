import { type TEither, left, right } from "@/core/Either";
import { mapper } from "../mappers/mapper";
import type {
  IGetDoctorConsultsQuery,
  IGetDoctorConsultsQueryExecuteParams,
} from "@/domain/queries/IGetDoctorConsultsQuery";
import { DoctorConsultsVM } from "@/domain/viewmodels/DoctorConsultsVM";
import { client } from "../modules/client";
import { parseResponse } from "../modules/ParseResponse";
import { DoctorConsultsResponse } from "../models/responses/DoctorConsultsResponse";

export class GetDoctorConsultsQuery implements IGetDoctorConsultsQuery {
  async execute(
    params: IGetDoctorConsultsQueryExecuteParams,
  ): Promise<TEither<undefined, DoctorConsultsVM[]>> {
    try {
      const response = await client(`/consults/doctors/${params.doctorId}/all`);

      const { data } = await parseResponse<DoctorConsultsResponse[]>(response);

      const mappedData = mapper.mapArray(
        data,
        DoctorConsultsResponse,
        DoctorConsultsVM,
      );

      return right(mappedData);
    } catch (err) {
      console.error("Error fetching doctor consults:", err);
      return left(undefined);
    }
  }

  async update() {}
}
