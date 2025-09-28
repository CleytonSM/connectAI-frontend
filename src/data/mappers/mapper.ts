import { classes } from "@automapper/classes";
import { createMap, createMapper, forMember, mapFrom } from "@automapper/core";
import { SampleResponse } from "../models/responses/SampleResponse";
import { SampleViewModel } from "@/domain/viewmodels/SampleViewModel";
import { DoctorResponse } from "../models/responses/DoctorResponse";
import { DoctorVM } from "@/domain/viewmodels/DoctorVM";
import { DoctorAvailabilityResponse } from "../models/responses/DoctorAvailabilityResponse";
import { DoctorAvailabilityVM } from "@/domain/viewmodels/DoctorAvailabilityVM";
import { AvailabilityResponse } from "../models/responses/AvailabilityResponse";
import { AvailabilityVM } from "@/domain/viewmodels/AvailabilityVM";
import { PatientAppointmentResponse } from "../models/responses/PatientAppoitmentResponse";
import { PatientAppointmentVM } from "@/domain/viewmodels/PatientAppoitmentVM";
import { DoctorConsultsResponse } from "../models/responses/DoctorConsultsResponse";
import { DoctorConsultsVM } from "@/domain/viewmodels/DoctorConsultsVM";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

createMap(mapper, SampleResponse, SampleViewModel);
createMap(mapper, DoctorConsultsResponse, DoctorConsultsVM);
createMap(mapper, DoctorResponse, DoctorVM);

createMap(mapper, AvailabilityResponse, AvailabilityVM);

createMap(mapper, DoctorAvailabilityResponse, DoctorAvailabilityVM);

createMap(
  mapper,
  PatientAppointmentResponse,
  PatientAppointmentVM,
  forMember(
    (dest) => dest.id,
    mapFrom(
      (src) => `${src.id.patientId}_${src.id.patientId}_${src.consultDate}`,
    ),
  ),
);
