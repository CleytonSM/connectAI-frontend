import * as v from "valibot";

export const ScheduleAppointmentSchema = v.object({
  specialty: v.string("Escolha uma especialidade"),
  date: v.string("Selecione uma data"),
  doctorId: v.string("Selecione um médico"),
});

export type IScheduleAppointmentSchema = v.InferInput<
  typeof ScheduleAppointmentSchema
>;
