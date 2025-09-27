import { ICommand } from "@/core/Command";
import { TEither } from "@/core/Either";
import { TApplicationError } from "@/core/errors/ApplicationError";
import { SampleViewModel } from "../viewmodels/SampleViewModel";

export interface ICreateSampleCommandExecuteParams {
  name: string;
}

export interface ICreateSampleCommand
  extends ICommand<
    ICreateSampleCommandExecuteParams,
    TEither<TApplicationError, SampleViewModel>
  > {}
