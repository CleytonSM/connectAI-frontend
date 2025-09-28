import type { ICommand } from "@/core/Command";
import type { TEither } from "@/core/Either";

export interface IScheduleUserAppointmentCommandExecuteParams {
  patientId: number;
  availableId: number;
  doctorId: number;
}

export interface IScheduleUserAppointmentCommand
  extends ICommand<
    IScheduleUserAppointmentCommandExecuteParams,
    TEither<undefined, undefined>
  > {}
