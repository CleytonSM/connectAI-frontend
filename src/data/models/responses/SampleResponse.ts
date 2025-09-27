import { AutoMap } from "@automapper/classes";

export class SampleResponse {
  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
