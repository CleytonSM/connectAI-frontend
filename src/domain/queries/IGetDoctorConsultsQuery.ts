import type { TEither } from "@/core/Either";
import type { IQuery } from "@/core/Query";
import type { TApplicationError } from "@/core/errors/ApplicationError";
import type { DoctorConsultsVM } from "@/domain/viewmodels/DoctorConsultsVM";

export interface IGetDoctorConsultsQueryExecuteParams {
  doctorId: number;
}

export interface IGetDoctorConsultsQuery
  extends IQuery<
    IGetDoctorConsultsQueryExecuteParams,
    undefined,
    TEither<undefined, DoctorConsultsVM[]>
  > {}
