import type { SpecialtiesEnum } from "@/domain/enums/SpecialtiesEnum";
import type { DoctorVM } from "@/domain/viewmodels/DoctorVM";
import { createGetDoctorsBySpecialtyQuery } from "@/factories/createGetDoctorsBySpecialtyQuery";
import { useState, useTransition, useEffect } from "react";

const getDoctorOptions = createGetDoctorsBySpecialtyQuery();

interface IUseDoctorsBySpecialtyProps {
  specialty: SpecialtiesEnum;
}

export const useDoctorsBySpecialty = ({
  specialty,
}: IUseDoctorsBySpecialtyProps) => {
  const [isPending, startTransition] = useTransition();
  const [doctors, setDoctors] = useState<DoctorVM[] | null>([]);

  useEffect(() => {
    if (!specialty) return;

    startTransition(async () => {
      const response = await getDoctorOptions.execute({ specialty });

      if (response.isLeft()) {
        setDoctors(null);
        return;
      }

      setDoctors(response.value);
    });
  }, [specialty]);

  return { doctors, isPending };
};
