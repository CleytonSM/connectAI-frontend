import { TEither, left, right } from "@/core/Either";
import { TApplicationError } from "@/core/errors/ApplicationError";
import { mapper } from "../mappers/mapper";
import { SampleResponse } from "../models/responses/SampleResponse";
import {
  IGetSamplesQuery,
  IGetSamplesQueryExecuteParams,
} from "@/domain/queries/IGetSampleQuery";
import { SampleViewModel } from "@/domain/viewmodels/SampleViewModel";
import { generateHttpErrorResponse } from "../modules/GenerateHttpResponseError";

// Query example

export class GetSampleQuery implements IGetSamplesQuery {
  async execute(
    params: IGetSamplesQueryExecuteParams,
  ): Promise<TEither<TApplicationError, SampleViewModel>> {
    try {
      const response = new SampleResponse(
        params.id.toString(),
        "Example response",
      );

      const mappedData = mapper.map(response, SampleResponse, SampleViewModel);

      return right(mappedData);
    } catch (err) {
      return left(generateHttpErrorResponse(err));
    }
  }

  async update(): Promise<void> {
    // Here you need to write a revalidation script who must use one of
    // the available NextJS revalidation functions like:
    //  - Revalidate tag
    //  - Revalidate path
  }
}
