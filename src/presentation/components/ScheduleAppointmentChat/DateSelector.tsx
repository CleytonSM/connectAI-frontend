import type { IScheduleAppointmentSchema } from "@/presentation/schemas/scheduleAppointmentSchema";
import { type Control, Controller, useWatch } from "react-hook-form";
import Button from "../Button";
import type { IChatMessage } from "@/presentation/@types/ChatMessage";
import { useDoctorAvailabilityOptions } from "@/presentation/hooks/useDoctorAvailabilityOptions";
import { ErrorFeedback } from "../ErrorFeedback";
import clsx from "clsx";

type MessageHandler = (msg: Partial<IChatMessage>) => void;

interface IDateSelectorProps {
  control: Control<IScheduleAppointmentSchema>;
  messageHandler: MessageHandler;
  nextStep?: () => void;
}

export const DateSelector = ({
  control,
  messageHandler,
  nextStep,
}: IDateSelectorProps) => {
  const doctorId = useWatch({ control, name: "doctorId" });
  const { availabilityOptions } = useDoctorAvailabilityOptions({ doctorId });

  if (!availabilityOptions) {
    return (
      <ErrorFeedback message="Ocorreu um erro ao carregar datas disponíveis" />
    );
  }

  return (
    <Controller
      name="date"
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {availabilityOptions.map((option) => {
            return (
              <Button
                key={option.value}
                type="button"
                onClick={() => {
                  field.onChange(option.value);
                  messageHandler({
                    content: `Dia escolhido: ${option.label}`,
                  });
                  nextStep?.();
                }}
                className={clsx("btn-soft text-xs", {
                  "btn-success": field.value === option.value,
                })}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      )}
    />
  );
};
