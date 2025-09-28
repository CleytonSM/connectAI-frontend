import type { PatientAppointmentVM } from "@/domain/viewmodels/PatientAppoitmentVM";
import { CheckCircle, CircleAlert } from "lucide-react";

interface IListProps {
  appointments: PatientAppointmentVM[];
}

export const List = ({ appointments }: IListProps) => {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {appointments.map((appointment, idx) => (
        <li
          key={`${appointment.id}-${idx}`}
          className="list-row flex items-start justify-between"
        >
          <div>
            <p className="font-semibold">{appointment.consultDate}</p>
            <p className="text-xs uppercase font-semibold opacity-60">
              {appointment.doctor.name}
            </p>
          </div>

          {appointment.hasHappened ? (
            <CheckCircle className="size-5 text-green-600" />
          ) : (
            <CircleAlert className="size-5 text-amber-400" />
          )}
        </li>
      ))}
    </ul>
  );
};
