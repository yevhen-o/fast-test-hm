import { BookInterface } from "../types/BookInterface";
import { ErrorResponse, RequestConfig } from "../types/httpClient";
import { API_BASE } from "./config";

// I know that's all is overengineering, and here just for show possibilities.

export default class ApiGateway {
  get = async (path: string) => {
    return await httpClient<BookInterface[]>({
      path,
      additionalOptions: {
        errorMessage: "Failed to load books",
      },
    });
  };
  post = async (path: string, payload: BookInterface) => {
    return await httpClient<BookInterface>({
      path,
      method: "POST",
      body: payload,
      additionalOptions: {
        deriveErrorMessage: (error) => {
          let message = "Something goes wrong";
          if (error && error instanceof Error) {
            message = error.message;
          }
          // check error -> response and reassign message if required
          return message;
        },
        errorMessage: "Hm... we can't add your book right now try again",
        deriveSuccessMessage: (book) =>
          `Book with name: ${book.name} added successfully`,
        successMessage: "Your book added",
      },
    });
  };
}

export async function httpClient<T>(
  config: RequestConfig<T>
): Promise<T | ErrorResponse> {
  const { path, method, headers, body, additionalOptions: options } = config;
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
        // authorization, refetch token etc
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    // check response and if 401 and exist refresh token, use it to get authorized and reply request.
    const dto = response.json() as T;
    if (
      options &&
      options.deriveSuccessMessage &&
      !!options?.deriveSuccessMessage?.(dto)
    ) {
      // show toast with error message
      console.log(options.deriveSuccessMessage(dto));
    } else if (options?.successMessage) {
      // show toast with error message
      console.log(options.successMessage);
    }
    return dto;
  } catch (error) {
    // show 404, 401, 403, 400, 500 page
    // show toast something goes wrong, or deriveErrorFromResponse

    let message = "";
    if (
      options &&
      options.deriveErrorMessage &&
      !!options.deriveErrorMessage(error)
    ) {
      message = options.deriveErrorMessage(error);
    } else if (options && options.errorMessage) {
      message = options.errorMessage;
    }

    // show toast message if it set, for now just console.log it
    if (message) {
      console.log(message);
    }

    return {
      error,
      message,
    };
  }
}
