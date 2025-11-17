import { create } from "zustand";
import type { StateCreator } from "zustand";

interface client {
  clientId?: string | null;
  clientIdAlias?: string | null;
  clientSecret?: string | null;
}

type OnboardingState = {
  serviceId?: string | null; // service apiKey
  isLoading: boolean;
  error?: string;

  setService: (s: string) => void;
  setClient: (c: client) => void;
  setLoading: (v: boolean) => void;
  setError: (msg?: string) => void;
  reset: () => void;
} & client;

export const useOnboardingStore = create<OnboardingState>((set) => ({
  serviceId: "4252493258",
  clientId: null,
  clientSecret: null,
  clientIdAlias: null,
  isLoading: false,
  error: undefined,
  responseType: "code",
  redirectUri: "https://my-client.example.com/cb1",
  scope: "read",

  setService: (serviceId) => set({ serviceId }),

  setClient: (client) =>
    set({
      clientId: client.clientId || null,
      clientSecret: client.clientSecret || null,
      clientIdAlias: client.clientIdAlias || null,
    }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (msg) => set({ error: msg }),
  reset: () =>
    set({
      serviceId: null,
      clientId: null,
      clientSecret: null,
      clientIdAlias: null,
      isLoading: false,
      error: undefined,
    }),
}));
