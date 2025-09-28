import { AutoMap } from "@automapper/classes";
import type { AvailabilityVM } from "./AvailabilityVM";
import { DoctorVM } from "./DoctorVM";

export class DoctorAvailabilityVM {
  @AutoMap(() => DoctorVM)
  doctor!: DoctorVM;

  @AutoMap(() => Array<AvailabilityVM>)
  availabilities!: AvailabilityVM[];
}
