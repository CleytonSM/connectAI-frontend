import type { ICommand } from "@/core/Command";
import type { TEither } from "@/core/Either";

export interface IUpdateConsultCommandExecuteParams {
  has_happend: boolean;
}

export interface IUpdateConsultCommand
  extends ICommand<
    IUpdateConsultCommandExecuteParams,
    TEither<undefined, undefined>
  > {}
