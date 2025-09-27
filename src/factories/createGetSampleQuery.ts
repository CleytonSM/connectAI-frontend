import { TFactory } from "@/core/Factory";
import { GetSampleQuery } from "@/data/queries/GetSampleQuery";

export const createGetSampleQuery: TFactory<GetSampleQuery> = () => {
  return new GetSampleQuery();
};
