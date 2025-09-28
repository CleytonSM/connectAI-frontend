import { AutoMap } from "@automapper/classes";
import { DoctorResponse } from "./DoctorResponse";

export class PatientAppointmentResponse {
  @AutoMap()
  id!: {
    patientId: number;
    doctorId: number;
  };

  @AutoMap(() => DoctorResponse)
  doctor!: DoctorResponse;

  @AutoMap()
  month!: number;

  @AutoMap()
  description!: string;

  @AutoMap()
  hasHappened!: boolean;

  @AutoMap()
  consultDate!: string;
}
