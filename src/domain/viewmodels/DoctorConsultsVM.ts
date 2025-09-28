import { AutoMap } from "@automapper/classes";

export class DoctorConsultsVM {
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
  @AutoMap()
  doctor!: {
    id: number;
    auth: {
      id: number;
      authName: string;
    };
    email: string;
    specialty: string;
    name: string;
    crm: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    active: boolean;
  };
  @AutoMap()
  month!: string;
  @AutoMap()
  description!: string;
  @AutoMap()
  hasHappened!: boolean;
  @AutoMap()
  consultDate!: string;
  @AutoMap()
  hour!: string;
  @AutoMap()
  createdAt!: string | null;
}
