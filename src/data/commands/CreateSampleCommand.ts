import { TEither, left, right } from "@/core/Either";
import { TApplicationError } from "@/core/errors/ApplicationError";
import {
  ICreateSampleCommand,
  ICreateSampleCommandExecuteParams,
} from "@/domain/commands/ICreateSampleCommand";
import { SampleResponse } from "../models/responses/SampleResponse";
import { mapper } from "../mappers/mapper";
import { SampleViewModel } from "@/domain/viewmodels/SampleViewModel";

export class CreateSampleCommand implements ICreateSampleCommand {
  async execute(
    params: ICreateSampleCommandExecuteParams,
  ): Promise<TEither<TApplicationError, SampleViewModel>> {
    try {
      const response = new SampleResponse("example id", params.name);

      const mappedData = mapper.map(response, SampleResponse, SampleViewModel);

      return right(mappedData);
    } catch (error) {
      return left(new Error("Test"));
    }
  }
}
