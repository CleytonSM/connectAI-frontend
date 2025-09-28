import * as v from "valibot";
import { SpecialtiesEnum } from "@/domain/enums/SpecialtiesEnum";

export const ScheduleAppointmentSchema = v.required(
  v.object({
    doctorId: v.pipe(v.number("Selecione um médico")),
    specialty: v.pipe(v.enum(SpecialtiesEnum)),
    date: v.pipe(v.number("Selecione uma data")),
  }),
);

export type IScheduleAppointmentSchema = v.InferInput<
  typeof ScheduleAppointmentSchema
>;
