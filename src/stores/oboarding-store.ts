import { create } from "zustand";
import type { StateCreator } from "zustand";

type OnboardingState = {
  serviceId?: string | null; // service apiKey
  clientId?: string | null;
  isLoading: boolean;
  error?: string;

  setService: (s: string) => void;
  setClient: (c: string) => void;
  setLoading: (v: boolean) => void;
  setError: (msg?: string) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  serviceId: "1223",
  clientId: null,
  isLoading: false,
  error: undefined,

  setService: (serviceId) => set({ serviceId }),
  setClient: (clientId) => set({ clientId }),
  setLoading: (v) => set({ isLoading: v }),
  setError: (msg) => set({ error: msg }),
  reset: () =>
    set({
      serviceId: null,
      clientId: null,
      isLoading: false,
      error: undefined,
    }),
}));
