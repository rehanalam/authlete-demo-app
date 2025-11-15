import { Authlete } from "@authlete/typescript-sdk";
import { getAccessToken } from "./organization";

export const authlete = new Authlete({
  bearer: getAccessToken() || "placeholder-token",
  serverURL: process.env.AUTHLETE_BASE_URL || "https://us.authlete.com",
});
