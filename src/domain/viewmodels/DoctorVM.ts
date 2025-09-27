import { AutoMap } from "@automapper/classes";

export class DoctorVM {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;
}
