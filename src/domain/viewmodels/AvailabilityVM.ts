import { AutoMap } from "@automapper/classes";

export class AvailabilityVM {
  @AutoMap()
  id!: number;

  @AutoMap()
  datetimeAvailable!: string;
}
