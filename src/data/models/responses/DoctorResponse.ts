import type { SpecialtiesEnum } from "@/domain/enums/SpecialtiesEnum";
import { AutoMap } from "@automapper/classes";

export class DoctorResponse {
  @AutoMap()
  id!: number;

  @AutoMap()
  auth!: {
    id: number;
    authName: string;
  };

  @AutoMap()
  email!: string;

  @AutoMap()
  specialtyId!: SpecialtiesEnum;

  @AutoMap()
  name!: string;

  @AutoMap()
  crm!: string;

  @AutoMap()
  createdAt!: string;

  @AutoMap()
  updatedAt!: string;

  @AutoMap()
  active!: boolean;

  @AutoMap()
  probability!: number;
}
