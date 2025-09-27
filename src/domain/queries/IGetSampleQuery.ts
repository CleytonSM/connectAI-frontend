import { TEither } from "@/core/Either";
import { IQuery } from "@/core/Query";
import { TApplicationError } from "@/core/errors/ApplicationError";
import { SampleViewModel } from "../viewmodels/SampleViewModel";

export interface IGetSamplesQueryExecuteParams {
  id: number;
}

export interface IGetSamplesQueryUpdateParams {}

export interface IGetSamplesQuery
  extends IQuery<
    IGetSamplesQueryExecuteParams,
    IGetSamplesQueryUpdateParams,
    TEither<TApplicationError, SampleViewModel>
  > {}
