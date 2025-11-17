// stores/useRecipeStore.ts
import { create } from "zustand";

type RecipeStoreState = {
  ticket?: string | null;
  authorizationCode?: string | null;
  token?: string | null;
  refreshToken?: string | null;
  completedSteps: string[]; // track completed step IDs

  setTicket: (t?: string | null) => void;
  setAuthorizationCode: (c?: string | null) => void;
  setTokens: (token?: string | null, refreshToken?: string | null) => void;
  addCompletedStep: (stepId: string) => void;
  reset: () => void;
};

export const useRecipeStore = create<RecipeStoreState>((set) => ({
  ticket: null,
  authorizationCode: null,
  token: null,
  refreshToken: null,
  completedSteps: [],
  subject: "john",
  scopes: ["history.read", "timeline.read"],

  setTicket: (t) => set({ ticket: t }),
  setAuthorizationCode: (c) => set({ authorizationCode: c }),
  setTokens: (token, refreshToken) =>
    set({ token: token ?? null, refreshToken: refreshToken ?? null }),

  addCompletedStep: (stepId) =>
    set((state) => ({
      completedSteps: [...state.completedSteps, stepId],
    })),

  reset: () =>
    set({
      ticket: null,
      authorizationCode: null,
      token: null,
      refreshToken: null,
      completedSteps: [],
    }),
}));
