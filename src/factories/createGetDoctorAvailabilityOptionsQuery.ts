import type { TFactory } from "@/core/Factory";
import { GetDoctorAvailabilityOptionsQuery } from "@/data/queries/GetDoctorAvailabilityOptionsQuery";

export const createGetDoctorAvailabilityOptionsQuery: TFactory<
  GetDoctorAvailabilityOptionsQuery
> = () => {
  return new GetDoctorAvailabilityOptionsQuery();
};
