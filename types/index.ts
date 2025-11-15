export const API_CLUSTERS = [
  { value: "US", label: "US", flag: "🇺🇸" },
  { value: "EU", label: "EU", flag: "🇪🇺" },
  { value: "JP", label: "JP", flag: "🇯🇵" },
  { value: "BR", label: "BR", flag: "🇧🇷" },
] as const;

export const CLIENT_TYPES = [
  { value: "PUBLIC", label: "Public Client" },
  { value: "CONFIDENTIAL", label: "Confidential Client" },
] as const;

export const APPLICATION_TYPES = [
  { value: "WEB", label: "Web Application" },
  { value: "NATIVE", label: "Native Application" },
] as const;

export interface Organization {
  id: string;
  name: string;
  description?: string;
  accessToken: string;
  apiServerId: number;
}

export interface AuthleteService {
  number?: number; // Service number (ID)
  serviceOwnerNumber?: number;
  serviceName?: string;
  apiKey?: number;
  issuer?: string;
  supportedScopes?: Array<{
    name: string;
    defaultEntry: boolean;
    description?: string;
  }>;
  supportedResponseTypes?: string[];
  supportedGrantTypes?: string[];
  supportedTokenAuthMethods?: string[];
  supportedDisplays?: string[];
  supportedClaimTypes?: string[];
  supportedClaims?: string[];
  accessTokenDuration?: number;
  refreshTokenDuration?: number;
  idTokenDuration?: number;
  createdAt?: number;
  modifiedAt?: number;
  metadata?: Array<{
    key: string;
    value: string;
  }>;
  [key: string]: unknown;
}

export interface ServiceFormData {
  serviceName: string;
  description?: string;
  cluster: string;
  fapiEnabled?: boolean;
}

export interface AuthleteClient {
  number?: number; // Client number (ID)
  serviceNumber?: number;
  clientId?: string;
  clientIdAlias?: string;
  clientSecret?: string;
  clientType?: "PUBLIC" | "CONFIDENTIAL";
  applicationType?: "WEB" | "NATIVE";
  clientName?: string;
  description?: string;
  redirectUris?: string[];
  responseTypes?: string[];
  grantTypes?: string[];
  [key: string]: unknown;
}
export interface ClientFormData {
  clientName: string;
  clientId?: string;
  description?: string;
  clientType: "PUBLIC" | "CONFIDENTIAL";
  applicationType?: "WEB" | "NATIVE";
  redirectUris?: string[];
}
