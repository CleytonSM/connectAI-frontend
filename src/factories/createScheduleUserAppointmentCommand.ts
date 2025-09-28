import type { TFactory } from "@/core/Factory";
import { ScheduleUserAppointmentCommand } from "@/data/commands/ScheduleUserAppointmentCommand";

export const createScheduleUserAppointmentCommand: TFactory<
  ScheduleUserAppointmentCommand
> = () => {
  return new ScheduleUserAppointmentCommand();
};
