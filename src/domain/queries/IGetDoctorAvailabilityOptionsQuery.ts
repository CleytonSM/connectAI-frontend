import type { TEither } from "../../core/Either";
import type { IQuery } from "../../core/Query";
import type { DoctorAvailabilityVM } from "../viewmodels/DoctorAvailabilityVM";

export interface IGetDoctorsAvailabilityOptionsQueryExecuteParams {
  doctorId: number;
}

export interface IGetDoctorsAvailabilityOptionsQuery
  extends IQuery<
    IGetDoctorsAvailabilityOptionsQueryExecuteParams,
    undefined,
    TEither<undefined, DoctorAvailabilityVM>
  > {}
