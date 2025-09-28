import type { TEither } from "../../core/Either";
import type { IQuery } from "../../core/Query";
import type { SpecialtiesEnum } from "../enums/SpecialtiesEnum";
import type { DoctorVM } from "../viewmodels/DoctorVM";

export interface IGetDoctorsBySpecialtyQueryExecuteParams {
  specialty: SpecialtiesEnum;
  patientId: number;
}

export interface IGetDoctorsBySpecialtyQuery
  extends IQuery<
    IGetDoctorsBySpecialtyQueryExecuteParams,
    undefined,
    TEither<undefined, DoctorVM[]>
  > {}
