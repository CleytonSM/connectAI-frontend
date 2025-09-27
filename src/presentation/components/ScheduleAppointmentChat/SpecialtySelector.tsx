import type { SpecialtiesEnum } from "@/domain/enums/SpecialtiesEnum";
import type { Options } from "@/presentation/@types/Option";
import type { IScheduleAppointmentSchema } from "@/presentation/schemas/scheduleAppointmentSchema";
import { type Control, Controller } from "react-hook-form";
import Button from "../Button";

type MessageHandler = (msg: string) => void;

interface ISpecialtySelectorProps {
  control: Control<IScheduleAppointmentSchema>;
  specialtyOptions: Options<SpecialtiesEnum>;
  messageHandler: MessageHandler;
  nextStep?: () => void;
}

export const SpecialtySelector = ({
  control,
  specialtyOptions,
  messageHandler,
  nextStep,
}: ISpecialtySelectorProps) => {
  return (
    <Controller
      name="specialty"
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {specialtyOptions.map((specialty) => (
            <Button
              key={specialty.value}
              type="button"
              onClick={() => {
                field.onChange(specialty.value);
                messageHandler(`Especialidade escolhida: ${specialty.label}`);
                nextStep?.();
              }}
              className="btn-soft"
            >
              {specialty.label}
            </Button>
          ))}
        </div>
      )}
    />
  );
};
