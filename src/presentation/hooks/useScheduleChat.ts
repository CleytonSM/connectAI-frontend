import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  type IScheduleAppointmentSchema,
  ScheduleAppointmentSchema,
} from "../schemas/scheduleAppointmentSchema";
import { createScheduleUserAppointmentCommand } from "@/factories/createScheduleUserAppointmentCommand";

const scheduleAppointment = createScheduleUserAppointmentCommand();

interface IUseScheduleAppointmentChatProps {
  onSuccess?: () => void;
}

export const useScheduleChat = ({
  onSuccess,
}: IUseScheduleAppointmentChatProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm<IScheduleAppointmentSchema>({
    resolver: valibotResolver(ScheduleAppointmentSchema),
    defaultValues: {
      specialty: undefined,
      date: undefined,
      doctorId: undefined,
    },
  });

  async function handleSuccessSubmit(data: IScheduleAppointmentSchema) {
    const userData = JSON.parse(localStorage.getItem("user-data") || "{}");

    const response = await scheduleAppointment.execute({
      doctorId: data.doctorId,
      availableId: data.date,
      patientId: userData.id,
    });

    if (response.isLeft()) return;

    onSuccess?.();
    reset();
  }

  return {
    control,
    handleSubmit: handleSubmit(handleSuccessSubmit),
    isValid,
    isSubmitting,
  };
};
