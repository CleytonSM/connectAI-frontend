import type { TFactory } from "@/core/Factory";
import { UserLoginCommand } from "@/data/commands/UserLoginCommand";

export const createUserLoginCommand: TFactory<UserLoginCommand> = () => {
  return new UserLoginCommand();
};
