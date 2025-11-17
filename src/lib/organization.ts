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
    description: "Default organization for testing and development",
    accessToken: getAccessToken(),
    apiServerId: 76281,
  },
  "123456789012345": {
    id: "123456789012345",
    name: "Acme Corporation",
    description: "Enterprise organization with production services",
    accessToken: getAccessToken(),
    apiServerId: 76281,
  },
  "987654321098765": {
    id: "987654321098765",
    name: "TechStart Inc",
    description: "Startup organization focused on innovation",
    accessToken: getAccessToken(),
    apiServerId: 76281,
  },
  "555555555555555": {
    id: "555555555555555",
    name: "Global Solutions",
    description: "Multi-region organization with global presence",
    accessToken: getAccessToken(),
    apiServerId: 76281,
  },
  "111111111111111": {
    id: "111111111111111",
    name: "Dev Team Alpha",
    description: "Development team organization for internal projects",
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
