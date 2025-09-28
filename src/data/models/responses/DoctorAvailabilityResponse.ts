import { AutoMap } from "@automapper/classes";
import { DoctorResponse } from "./DoctorResponse";
import type { AvailabilityResponse } from "./AvailabilityResponse";

export class DoctorAvailabilityResponse {
  @AutoMap(() => DoctorResponse)
  doctor!: DoctorResponse;

  @AutoMap(() => Array<AvailabilityResponse>)
  availabilities!: AvailabilityResponse[];
}
