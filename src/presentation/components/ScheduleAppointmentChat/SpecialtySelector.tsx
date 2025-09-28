import type { SpecialtiesEnum } from "@/domain/enums/SpecialtiesEnum";
import type { Options } from "@/presentation/@types/Option";
import type { IScheduleAppointmentSchema } from "@/presentation/schemas/scheduleAppointmentSchema";
import { type Control, Controller } from "react-hook-form";
import Button from "../Button";
import type { IChatMessage } from "@/presentation/@types/ChatMessage";
import clsx from "clsx";

type MessageHandler = (msg: Partial<IChatMessage>) => void;

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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {specialtyOptions.map((specialty) => (
            <Button
              key={specialty.value}
              type="button"
              onClick={() => {
                field.onChange(specialty.value);
                messageHandler({
                  content: `Especialidade escolhida: ${specialty.label}`,
                });
                nextStep?.();
              }}
              className={clsx("btn-soft text-xs", {
                "btn-success": field.value === specialty.value,
              })}
            >
              {specialty.label}
            </Button>
          ))}
        </div>
      )}
    />
  );
};
