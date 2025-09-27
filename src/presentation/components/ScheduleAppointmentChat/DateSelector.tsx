import type { IScheduleAppointmentSchema } from "@/presentation/schemas/scheduleAppointmentSchema";
import { type Control, Controller } from "react-hook-form";
import Button from "../Button";

type MessageHandler = (msg: string) => void;

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
  const hoje = new Date();
  const proximosDias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(hoje);
    d.setDate(hoje.getDate() + i + 1);
    return d;
  });

  return (
    <Controller
      name="date"
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {proximosDias.map((d) => {
            const iso = d.toISOString().split("T")[0];
            return (
              <Button
                key={iso}
                type="button"
                onClick={() => {
                  field.onChange(iso);
                  messageHandler(
                    `Dia escolhido: ${d.toLocaleDateString("pt-BR")}`,
                  );
                  nextStep?.();
                }}
                className="btn-soft"
              >
                {d.toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                })}
              </Button>
            );
          })}
        </div>
      )}
    />
  );
};
