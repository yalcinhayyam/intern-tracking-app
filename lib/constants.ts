import { FailureInformationType, RegistryType } from "@/lib/utilities";

// Service
export const CONTEXT: RegistryType<"CONTEXT"> = "CONTEXT";
export const PRISMA_CLIENT: RegistryType<"PRISMA_CLIENT"> = "PRISMA_CLIENT";
export const LOGGER: RegistryType<"LOGGER"> = "LOGGER";
export const USER_SERVICE: RegistryType<"USER_SERVICE"> = "USER_SERVICE";

// Handler
export const GET_BOOKS_HANDLER: RegistryType<"GET_BOOKS_HANDLER"> =
  "GET_BOOKS_HANDLER";
export const CREATE_BOOK_HANDLER: RegistryType<"CREATE_BOOK_HANDLER"> =
  "CREATE_BOOK_HANDLER";
export const GET_USER_HANDLER: RegistryType<"GET_USER_HANDLER"> =
  "GET_USER_HANDLER";
export const CREATE_USER_HANDLER: RegistryType<"CREATE_USER_HANDLER"> =
  "CREATE_USER_HANDLER";

// Failures

export const EMAIL_ALREADY_EXISTS: FailureInformationType<"EMAIL_ALREADY_EXISTS"> =
  {
    code: "EMAIL_ALREADY_EXISTS",
    message: "Email already registered",
    type: "BUSINESS_FAILURE",
  };

export const USER_NOT_FOUND: FailureInformationType<"USER_NOT_FOUND"> = {
  code: "USER_NOT_FOUND",
  message: "User not found",
  type: "BUSINESS_FAILURE",
};
