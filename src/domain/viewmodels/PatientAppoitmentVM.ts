import { AutoMap } from "@automapper/classes";
import { DoctorVM } from "./DoctorVM";

export class PatientAppointmentVM {
  @AutoMap()
  id!: string;

  @AutoMap(() => DoctorVM)
  doctor!: DoctorVM;

  @AutoMap()
  month!: number;

  @AutoMap()
  description!: string;

  @AutoMap()
  hasHappened!: boolean;

  @AutoMap()
  consultDate!: string;
}
