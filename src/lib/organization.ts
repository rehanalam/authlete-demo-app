import { Organization } from "../types";

export const getAccessToken = (): string => {
  const token = process.env.AUTHLETE_BEARER || "";
  if (!token) {
    console.warn("AUTHLETE_BEARER not set in environment");
    return "";
  }
  return token;
};

// Hard-coded organizations
export const ORGANIZATIONS: Record<string, Organization> = {
  "363934947538147": {
    id: "363934947538147",
    name: "Rehan Org FREE",
    description: "Default organization",
    accessToken: getAccessToken(),
    apiServerId: 76281,
  },
};

export const getOrganization = (id: string): Organization | null => {
  return ORGANIZATIONS[id] || null;
};

export const getAllOrganizations = (): Organization[] => {
  return Object.values(ORGANIZATIONS);
};

export const getDefaultOrganization = (): Organization => {
  return ORGANIZATIONS["363934947538147"];
};
