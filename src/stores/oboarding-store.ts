import { getServiceId } from "@/lib/service";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const REDIRECT_URI = "https://my-client.example.com/cb1";
const SERVICE_ID = getServiceId();

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
      serviceId: SERVICE_ID,
      clientId: null,
      clientSecret: null,
      clientIdAlias: null,
      isLoading: false,
      error: undefined,
      responseType: "code",
      redirectUri: REDIRECT_URI,
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
