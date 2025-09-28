import type { TFactory } from "@/core/Factory";
import { SendOrionMessageCommand } from "@/data/commands/SendOrionMessageCommand";

export const createSendOrionMessageCommand: TFactory<
  SendOrionMessageCommand
> = () => {
  return new SendOrionMessageCommand();
};
