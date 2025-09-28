import type { TFactory } from "@/core/Factory";
import { GetDoctorsBySpecialtyQuery } from "@/data/queries/GetDoctorsBySpecialtyQuery";

export const createGetDoctorsBySpecialtyQuery: TFactory<
  GetDoctorsBySpecialtyQuery
> = () => {
  return new GetDoctorsBySpecialtyQuery();
};
