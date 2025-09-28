import { AutoMap } from "@automapper/classes";

export class AvailabilityResponse {
  @AutoMap()
  id!: number;

  @AutoMap()
  dateTimeAvailable!: string;
}
