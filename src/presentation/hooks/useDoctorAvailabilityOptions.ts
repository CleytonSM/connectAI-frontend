import { createGetDoctorAvailabilityOptionsQuery } from "@/factories/createGetDoctorAvailabilityOptionsQuery";
import { useState, useTransition, useEffect } from "react";
import type { Options } from "../@types/Option";

const getAvailabilityOptions = createGetDoctorAvailabilityOptionsQuery();

interface IUseDoctorAvailabilityOptionsProps {
  doctorId: number;
}

export const useDoctorAvailabilityOptions = ({
  doctorId,
}: IUseDoctorAvailabilityOptionsProps) => {
  const [isPending, startTransition] = useTransition();
  const [availabilityOptions, setAvailabilityOptions] =
    useState<Options<number> | null>([]);

  useEffect(() => {
    if (!doctorId) return;

    startTransition(async () => {
      const response = await getAvailabilityOptions.execute({ doctorId });

      if (response.isLeft()) {
        setAvailabilityOptions(null);
        return;
      }

      const mappedOptions = response.value.availabilities.map(
        (availability) => ({
          label: availability.datetimeAvailable,
          value: availability.id,
        }),
      );

      setAvailabilityOptions(mappedOptions);
    });
  }, [doctorId]);

  return { availabilityOptions, isPending };
};
