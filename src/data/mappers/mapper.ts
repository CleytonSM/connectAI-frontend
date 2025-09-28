import { classes } from "@automapper/classes";
import { createMap, createMapper } from "@automapper/core";
import { SampleResponse } from "../models/responses/SampleResponse";
import { SampleViewModel } from "@/domain/viewmodels/SampleViewModel";
import { DoctorResponse } from "../models/responses/DoctorResponse";
import { DoctorVM } from "@/domain/viewmodels/DoctorVM";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

createMap(mapper, SampleResponse, SampleViewModel);

createMap(mapper, DoctorResponse, DoctorVM);
