import type { IChatMessage } from "@/presentation/@types/ChatMessage";
import { useDoctorsBySpecialty } from "@/presentation/hooks/useDoctorsBySpecialty";
import type { IScheduleAppointmentSchema } from "@/presentation/schemas/scheduleAppointmentSchema";
import { type Control, Controller, useWatch } from "react-hook-form";
import { ErrorFeedback } from "../ErrorFeedback";
import clsx from "clsx";

type MessageHandler = (msg: Partial<IChatMessage>) => void;

interface IDoctorSelectorProps {
  control: Control<IScheduleAppointmentSchema>;
  messageHandler: MessageHandler;
  nextStep?: () => void;
}

export const DoctorSelector = ({
  control,
  messageHandler,
  nextStep,
}: IDoctorSelectorProps) => {
  const specialty = useWatch({ control, name: "specialty" });

  const { doctors } = useDoctorsBySpecialty({ specialty });

  if (!doctors) {
    return (
      <ErrorFeedback message="Ocorreu um erro ao carregar as opções de médico" />
    );
  }

  return (
    <Controller
      name="doctorId"
      control={control}
      render={({ field }) => (
        <div className="space-y-3 mt-2">
          {doctors.map((doctor) => (
            <button
              key={doctor.id}
              type="button"
              className={clsx(
                "border rounded-lg p-3 cursor-pointer hover:shadow",
                {
                  "bg-green-200 text-green-600": field.value === doctor.id,
                },
              )}
              onClick={() => {
                field.onChange(doctor.id);
                messageHandler({ content: `Médico escolhido: ${doctor.name}` });
                nextStep?.();
              }}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{doctor.name}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    />
  );
};
