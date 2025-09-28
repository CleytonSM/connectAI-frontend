import type { PatientAppointmentVM } from "@/domain/viewmodels/PatientAppoitmentVM";
import { CircleAlert } from "lucide-react";

interface IListProps {
  appointments: PatientAppointmentVM[];
}

export const List = ({ appointments }: IListProps) => {
  return (
    <ul className="list grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-base-100 rounded-box shadow-md">
      {appointments.map((appointment, idx) => (
        <li
          key={`${appointment.id}-${idx}`}
          className="list-row flex items-start justify-between"
        >
          <div>
            <p>{appointment.consultDate}</p>
            <p className="text-xs uppercase font-semibold opacity-60">
              {appointment.doctor.name}
            </p>
          </div>

          <CircleAlert className="size-5 text-amber-400" />
        </li>
      ))}
    </ul>
  );
};
