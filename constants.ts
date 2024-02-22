// import { FailureInformationType, RegistryType } from "@/utilities";

import { FailureInformationType, RegistryType } from "@/types";


// Values
export const AUTH_OPTIONS: RegistryType<"AUTH_OPTIONS"> = "AUTH_OPTIONS";
// export const CONTEXT: RegistryType<"CONTEXT"> = "CONTEXT";

// Utilities 
export const SESSION: RegistryType<"SESSION"> = "SESSION";
export const QUERY: RegistryType<"QUERY"> = "QUERY";
export const COMPARE_PASSWORD: RegistryType<"COMPARE_PASSWORD"> = "COMPARE_PASSWORD";


// Service
export const PRISMA_CLIENT: RegistryType<"PRISMA_CLIENT"> = "PRISMA_CLIENT";
export const LOGGER: RegistryType<"LOGGER"> = "LOGGER";
export const USER_SERVICE: RegistryType<"USER_SERVICE"> = "USER_SERVICE";
export const DATE_TIME_PROVIDER: RegistryType<"DATE_TIME_PROVIDER"> =
  "DATE_TIME_PROVIDER";

// Handler
export const GET_BOOKS_HANDLER: RegistryType<"GET_BOOKS_HANDLER"> =
  "GET_BOOKS_HANDLER";
export const CREATE_BOOK_HANDLER: RegistryType<"CREATE_BOOK_HANDLER"> =
  "CREATE_BOOK_HANDLER";

  
export const GET_USER_HANDLER: RegistryType<"GET_USER_HANDLER"> =
  "GET_USER_HANDLER";
export const CREATE_USER_HANDLER: RegistryType<"CREATE_USER_HANDLER"> =
  "CREATE_USER_HANDLER";


export const CREATE_INTERNSHIP_HANDLER: RegistryType<"CREATE_INTERNSHIP_HANDLER"> =
  "CREATE_INTERNSHIP_HANDLER";

// Failures

export const UNEXPECTED_ERROR: FailureInformationType<"UNEXPECTED_ERROR"> =
  createFailureInformationType(
    "UNEXPECTED_ERROR",
    "SSomething went wrong!"
  );

export const EMAIL_ALREADY_EXISTS: FailureInformationType<"EMAIL_ALREADY_EXISTS"> =
  createFailureInformationType(
    "EMAIL_ALREADY_EXISTS",
    "Email already registered"
  );

export const USER_NOT_FOUND: FailureInformationType<"USER_NOT_FOUND"> =
  createFailureInformationType("USER_NOT_FOUND", "User not found");

export const EMAIL_OR_PASSWORD_INCORRECT: FailureInformationType<"EMAIL_OR_PASSWORD_INCORRECT"> =
  createFailureInformationType(
    "EMAIL_OR_PASSWORD_INCORRECT",
    "Email or Password incorrect"
  );

export const CONTENT_LENGTH = (
  argument: string,
  length: number
): FailureInformationType<"CONTENT_LENGTH"> =>
  createFailureInformationType(
    "CONTENT_LENGTH",
    `Argument ${argument} must longer than ${length} character`
  );

type FailureType = "CONTENT_LENGTH";

export function createFailureInformationType<T extends FailureType | string>(
  code: T,
  message: string,
  type?: "BUSINESS_FAILURE"
) {
  return {
    code,
    message,
    type: type || "BUSINESS_FAILURE",
  };
}
