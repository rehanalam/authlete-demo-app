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
  accessToken: string; // Masked token from env
  apiServerId: number;
}
