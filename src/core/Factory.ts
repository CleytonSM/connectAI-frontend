import { ICommand } from "./Command";
import { IQuery } from "./Query";

export type TFactory<T extends ICommand<any, any> | IQuery<any, any, any>> =
  () => T;
