import { classes } from "@automapper/classes";
import { createMap, createMapper } from "@automapper/core";
import { SampleResponse } from "../models/responses/SampleResponse";
import { SampleViewModel } from "@/domain/viewmodels/SampleViewModel";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

createMap(mapper, SampleResponse, SampleViewModel);
