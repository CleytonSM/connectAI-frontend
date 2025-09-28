import { type TEither, left, right } from "@/core/Either";
import { client } from "../modules/client";
import type {
  IScheduleUserAppointmentCommand,
  IScheduleUserAppointmentCommandExecuteParams,
} from "@/domain/commands/IScheduleUserAppointmentCommand";

export class ScheduleUserAppointmentCommand
  implements IScheduleUserAppointmentCommand
{
  async execute(
    params: IScheduleUserAppointmentCommandExecuteParams,
  ): Promise<TEither<undefined, undefined>> {
    try {
      const payload = {
        patientId: params.patientId,
        availableId: params.availableId,
      };

      await client(`/consults/doctors/${params.doctorId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return right(undefined);
    } catch (error) {
      return left(undefined);
    }
  }
}
