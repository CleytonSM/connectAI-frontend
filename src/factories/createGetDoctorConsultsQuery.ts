import type { TFactory } from "@/core/Factory";
import { GetDoctorConsultsQuery } from "@/data/queries/GetDoctorConsultsQuery";

export const createGetDoctorConsultsQuery: TFactory<
  GetDoctorConsultsQuery
> = () => {
  return new GetDoctorConsultsQuery();
};
