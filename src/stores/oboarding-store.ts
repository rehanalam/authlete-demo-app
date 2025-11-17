import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Client {
  clientId?: string | null;
  clientIdAlias?: string | null;
  clientSecret?: string | null;
}

type OnboardingState = {
  serviceId?: string | null;
  isLoading: boolean;
  error?: string;

  setService: (s: string) => void;
  setClient: (c: Client) => void;
  setLoading: (v: boolean) => void;
  setError: (msg?: string) => void;
  reset: () => void;
} & Client;

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
