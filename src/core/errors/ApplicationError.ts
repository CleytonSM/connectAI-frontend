import { CriticalError } from "./CriticalError";
import { ForbiddenError } from "./ForbiddenError";
import { LockedError } from "./LockedError";
import { NotAcceptableError } from "./NotAcceptable";
import { NotFoundError } from "./NotFoundError";
import { UnauthorizedError } from "./UnauthorizedError";
import { ValidationError } from "./ValidationError";

export type TApplicationError =
  | Error
  | CriticalError
  | ForbiddenError
  | LockedError
  | NotAcceptableError
  | NotFoundError
  | UnauthorizedError
  | ValidationError;
