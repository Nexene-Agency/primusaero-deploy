import { uuidv4 } from "@firebase/util";
import { AxiosError } from "axios";

export class ServiceError extends Error {
  private readonly id: string;
  private readonly timestamp: string;
  private readonly payload: unknown;

  constructor(
    public readonly code: number,
    message?: string,
    payload?: unknown
  ) {
    super(message);
    this.id = uuidv4().toString();
    this.timestamp = new Date().toISOString();
    this.payload = payload;
  }
}

export const wrapError = (error: unknown): ServiceError => {
  return error instanceof ServiceError
    ? error
    : new ServiceError(
        500,
        Reflect.get(error as object, "message"),
        (error as object).toString()
      );
};

export const axiosErrorAsServiceError = (err: AxiosError): ServiceError => {
  const payload = (err.response?.data as any).error || {};
  return new ServiceError(
    payload.code ?? err.code,
    payload.message ?? err.message,
    payload
  );
};
