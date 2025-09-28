import { type TEither, left, right } from "@/core/Either";
import { client } from "../modules/client";

import { parseResponse } from "../modules/ParseResponse";
import type {
  ISendOrionMessageCommand,
  ISendOrionMessageCommandExecuteParams,
} from "@/domain/commands/ISendOrionMessageCommand";
import type { OrionResponse } from "../models/responses/OrionResponse";

export class SendOrionMessageCommand implements ISendOrionMessageCommand {
  async execute(
    params: ISendOrionMessageCommandExecuteParams,
  ): Promise<TEither<undefined, OrionResponse>> {
    try {
      const payload = {
        message: params.message,
      };

      const response = await client("/chat/message", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const { data } = await parseResponse<OrionResponse>(response);

      return right(data);
    } catch (error) {
      return left(undefined);
    }
  }
}
