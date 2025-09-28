import { classes } from "@automapper/classes";
import { createMap, createMapper } from "@automapper/core";
import { SampleResponse } from "../models/responses/SampleResponse";
import { SampleViewModel } from "@/domain/viewmodels/SampleViewModel";
import { DoctorResponse } from "../models/responses/DoctorResponse";
import { DoctorVM } from "@/domain/viewmodels/DoctorVM";
import { DoctorAvailabilityResponse } from "../models/responses/DoctorAvailabilityResponse";
import { DoctorAvailabilityVM } from "@/domain/viewmodels/DoctorAvailabilityVM";
import { AvailabilityResponse } from "../models/responses/AvailabilityResponse";
import { AvailabilityVM } from "@/domain/viewmodels/AvailabilityVM";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

createMap(mapper, SampleResponse, SampleViewModel);

createMap(mapper, DoctorResponse, DoctorVM);

createMap(mapper, AvailabilityResponse, AvailabilityVM);

createMap(mapper, DoctorAvailabilityResponse, DoctorAvailabilityVM);
