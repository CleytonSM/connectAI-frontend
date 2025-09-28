import { type TEither, left, right } from "@/core/Either";
import { client } from "../modules/client";
import { parseResponse } from "../modules/ParseResponse";
import type {
  IUserLoginCommand,
  IUserLoginCommandExecuteParams,
} from "@/domain/commands/IUserLoginCommand";
import type { LoginResponse } from "../models/responses/LoginResponse";

export class UserLoginCommand implements IUserLoginCommand {
  async execute(
    params: IUserLoginCommandExecuteParams,
  ): Promise<TEither<undefined, LoginResponse>> {
    try {
      const response = await client("/login", {
        method: "POST",
        body: JSON.stringify(params),
      });

      const { data } = await parseResponse<LoginResponse>(response);

      return right(data);
    } catch (error) {
      return left(undefined);
    }
  }
}
