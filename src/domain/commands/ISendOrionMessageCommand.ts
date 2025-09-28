import type { ICommand } from "@/core/Command";
import type { TEither } from "@/core/Either";
import type { OrionResponse } from "@/data/models/responses/OrionResponse";

export interface ISendOrionMessageCommandExecuteParams {
  message: string;
}

export interface ISendOrionMessageCommand
  extends ICommand<
    ISendOrionMessageCommandExecuteParams,
    TEither<undefined, OrionResponse>
  > {}
