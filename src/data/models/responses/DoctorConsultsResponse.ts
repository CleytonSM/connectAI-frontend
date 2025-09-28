import { AutoMap } from "@automapper/classes";
import { DoctorResponse } from "./DoctorResponse";

export class DoctorConsultsResponse {
  @AutoMap()
  id!: {
    patientId: number;
    doctorId: number;
  };

  @AutoMap()
  patient!: {
    id: number;
    auth: {
      id: number;
      authName: string;
    };
    email: string;
    name: string;
    cpf: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    active: boolean;
  };

  @AutoMap(() => DoctorResponse)
  doctor!: DoctorResponse;

  @AutoMap()
  month!: string | null;

  @AutoMap()
  description!: string | null;

  @AutoMap()
  hasHappened!: boolean;

  @AutoMap()
  consultDate!: string;

  @AutoMap()
  hour!: string;

  @AutoMap()
  createdAt!: string | null;
}
