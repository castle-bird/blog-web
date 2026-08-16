export type SuccessResponse<T> = {
  data: T;
  message: "Success";
};

export type ErrorResponse = {
  code: string;
  message: string;
};

export class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}
