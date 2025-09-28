import { SpecialtiesEnum } from "@/domain/enums/SpecialtiesEnum";
import { SPECIALTIES_LABELS } from "./specialtiesLables";

export const SPECIALTIES_OPTIONS = Object.values(SpecialtiesEnum).map(
  (value) => ({
    label: SPECIALTIES_LABELS[value],
    value,
  }),
);
