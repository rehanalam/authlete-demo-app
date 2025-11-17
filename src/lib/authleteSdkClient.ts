import { Authlete } from "@authlete/typescript-sdk";
import { getAccessToken } from "./organization";

export const authlete = new Authlete({
  bearer: getAccessToken() || "placeholder-token",
  serverURL: process.env.AUTHLETE_BASE_URL || "https://us.authlete.com",
});

export const ACTION_STATUS_MAP: Record<string, number> = {
  BAD_REQUEST: 400,
  INVALID_CLIENT: 401,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};
