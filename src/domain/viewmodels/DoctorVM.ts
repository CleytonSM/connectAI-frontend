import { AutoMap } from "@automapper/classes";
import type { SpecialtiesEnum } from "../enums/SpecialtiesEnum";

export class DoctorVM {
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
