import type { DoctorVM } from "@/domain/viewmodels/DoctorVM";
import type { IScheduleAppointmentSchema } from "@/presentation/schemas/scheduleAppointmentSchema";
import { type Control, Controller } from "react-hook-form";

type MessageHandler = (msg: string) => void;

interface IDoctorSelectorProps {
  control: Control<IScheduleAppointmentSchema>;
  doctors: DoctorVM[];
  messageHandler: MessageHandler;
  nextStep?: () => void;
}

export const DoctorSelector = ({
  control,
  doctors,
  messageHandler,
  nextStep,
}: IDoctorSelectorProps) => {
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
              className="border rounded-lg p-3 cursor-pointer hover:shadow"
              onClick={() => {
                field.onChange(doctor.id);
                messageHandler(`Médico escolhido: ${doctor.name}`);
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
