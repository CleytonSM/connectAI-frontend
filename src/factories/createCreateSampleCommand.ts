import { TFactory } from "@/core/Factory";
import { CreateSampleCommand } from "@/data/commands/CreateSampleCommand";

export const createCreateSampleCommand: TFactory<CreateSampleCommand> = () => {
  return new CreateSampleCommand();
};
