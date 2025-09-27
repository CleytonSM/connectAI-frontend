import { ResponseError } from "@/core/ResponseError";
import { HttpStatusCode } from "../services/HttpStatusCode";

const ERROR_METHODS = [
  HttpStatusCode.BAD_REQUEST,
  HttpStatusCode.UNAUTHORIZED,
  HttpStatusCode.PAYMENT_REQUIRED,
  HttpStatusCode.FORBIDDEN,
  HttpStatusCode.NOT_FOUND,
  HttpStatusCode.METHOD_NOT_ALLOWED,
  HttpStatusCode.NOT_ACCEPTABLE,
  HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED,
  HttpStatusCode.REQUEST_TIMEOUT,
  HttpStatusCode.CONFLICT,
  HttpStatusCode.GONE,
  HttpStatusCode.LENGTH_REQUIRED,
  HttpStatusCode.PRECONDITION_FAILED,
  HttpStatusCode.PAYLOAD_TOO_LARGE,
  HttpStatusCode.URI_TOO_LONG,
  HttpStatusCode.UNSUPPORTED_MEDIA_TYPE,
  HttpStatusCode.RANGE_NOT_SATISFIABLE,
  HttpStatusCode.EXPECTATION_FAILED,
  HttpStatusCode.I_AM_A_TEAPOT,
  HttpStatusCode.MISDIRECTED_REQUEST,
  HttpStatusCode.UNPROCESSABLE_ENTITY,
  HttpStatusCode.LOCKED,
  HttpStatusCode.FAILED_DEPENDENCY,
  HttpStatusCode.UPGRADE_REQUIRED,
  HttpStatusCode.PRECONDITION_REQUIRED,
  HttpStatusCode.TOO_MANY_REQUESTS,
  HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE,
  HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS,
  HttpStatusCode.INTERNAL_SERVER_ERROR,
  HttpStatusCode.NOT_IMPLEMENTED,
  HttpStatusCode.BAD_GATEWAY,
  HttpStatusCode.SERVICE_UNAVAILABLE,
  HttpStatusCode.GATEWAY_TIMEOUT,
  HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED,
  HttpStatusCode.VARIANT_ALSO_NEGOTIATES,
  HttpStatusCode.INSUFFICIENT_STORAGE,
  HttpStatusCode.LOOP_DETECTED,
  HttpStatusCode.NOT_EXTENDED,
  HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED,
];

interface IParsedResponseReturn<T> {
  data: T;
  status: HttpStatusCode;
  headers: Headers;
}

export async function parseResponse<T>(
  resp: Response,
): Promise<IParsedResponseReturn<T>> {
  const { headers, status } = resp;

  const data = await resp.json();

  const response = {
    data,
    status,
    headers,
  };

  if (ERROR_METHODS.includes(status)) {
    throw new ResponseError(data.message ?? "Error", response.data, status);
  }

  return response;
}
