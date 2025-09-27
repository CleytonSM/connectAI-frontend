import { NotAcceptableError } from "@/core/errors/NotAcceptable";
import { TApplicationError } from "@/core/errors/ApplicationError";
import { CriticalError } from "@/core/errors/CriticalError";
import { ForbiddenError } from "@/core/errors/ForbiddenError";
import { NotFoundError } from "@/core/errors/NotFoundError";
import { UnauthorizedError } from "@/core/errors/UnauthorizedError";
import { ValidationError } from "@/core/errors/ValidationError";
import { HttpStatusCode } from "../services/HttpStatusCode";
import { ResponseError } from "@/core/ResponseError";

interface FieldMap {
  [key: string]: string;
}

interface HttpResponseError {
  message: string;
  statusCode: number;
  errors?: {
    [key: string]: string;
  };
}

function formatProperty(property: string, fieldMap: FieldMap): string {
  const splittedProperty = property.split(".");
  if (splittedProperty.length >= 3) {
    return `${fieldMap[splittedProperty[0]]}.${splittedProperty[1]}.${
      fieldMap[splittedProperty[2]]
    }`;
  } else {
    return fieldMap[splittedProperty[0]];
  }
}

export function generateHttpErrorResponse(
  unknownError: unknown,
  fieldMap?: FieldMap,
): TApplicationError {
  if (!(unknownError instanceof Error))
    return new CriticalError(new Error(`Error can't be handled!`));

  const error = unknownError as ResponseError<HttpResponseError>;

  if (error?.response != null) {
    const { response: data, status } = error;

    const responseError = new Error(data ? data.message : error.message);

    if (status === HttpStatusCode.UNAUTHORIZED) {
      return new UnauthorizedError(responseError);
    }

    if (status === HttpStatusCode.FORBIDDEN) {
      return new ForbiddenError(responseError);
    }

    if (status === HttpStatusCode.NOT_FOUND) {
      return new NotFoundError(responseError);
    }

    if (status === HttpStatusCode.NOT_ACCEPTABLE) {
      const resolvedError = !!data.errors
        ? new Error(Object.values(data.errors)[0])
        : responseError;
      return new NotAcceptableError(resolvedError);
    }

    if (status === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      return new CriticalError(responseError);
    }

    if (
      status === HttpStatusCode.UNPROCESSABLE_ENTITY &&
      data.errors !== undefined
    ) {
      return new ValidationError(
        Object.entries(data.errors).map((err) => {
          const parameter = fieldMap
            ? formatProperty(err[0], fieldMap)
            : err[0];
          return {
            parameter,
            error: err[1],
          };
        }),
      );
    }

    return new CriticalError(responseError);
  }

  return new CriticalError(error);
}
