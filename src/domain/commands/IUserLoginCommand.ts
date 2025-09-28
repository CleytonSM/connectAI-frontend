import type { ICommand } from "@/core/Command";
import type { TEither } from "@/core/Either";
import type { LoginResponse } from "@/data/models/responses/LoginResponse";

export interface IUserLoginCommandExecuteParams {
  email: string;
}

export interface IUserLoginCommand
  extends ICommand<
    IUserLoginCommandExecuteParams,
    TEither<undefined, LoginResponse>
  > {}
