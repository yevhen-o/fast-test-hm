export type Methods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type AdditionalRequestOption<T> = {
  successMessage?: string;
  deriveSuccessMessage?: (response: T) => string;
  errorMessage?: string;
  deriveErrorMessage?: (error: unknown) => string;
};

export type RequestConfig<T> = {
  path: string;
  method?: "PATCH" | "POST" | "GET" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: Partial<T>;
  additionalOptions?: AdditionalRequestOption<T>;
};

export type ErrorResponse = {
  error: unknown;
  message: string;
};
