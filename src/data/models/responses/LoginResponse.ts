import { AutoMap } from "@automapper/classes";

export class LoginResponse {
  @AutoMap()
  id!: number;

  @AutoMap()
  label!: string;
}
