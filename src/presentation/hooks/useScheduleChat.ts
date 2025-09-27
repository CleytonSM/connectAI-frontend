import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  type IScheduleAppointmentSchema,
  ScheduleAppointmentSchema,
} from "../schemas/scheduleAppointmentSchema";

interface IUseScheduleAppointmentChatProps {
  onSuccess?: () => void;
}

export const useScheduleChat = ({
  onSuccess,
}: IUseScheduleAppointmentChatProps) => {
  const { control, handleSubmit, reset, watch } =
    useForm<IScheduleAppointmentSchema>({
      resolver: valibotResolver(ScheduleAppointmentSchema),
      defaultValues: {
        specialty: "",
        date: "",
        doctorId: "",
      },
    });

  async function handleSuccessSubmit(data: IScheduleAppointmentSchema) {
    console.log(data);
    onSuccess?.();
  }

  return {
    control,
    handleSubmit: handleSubmit(handleSuccessSubmit),
    reset,
    watch,
  };
};
