import { create } from "zustand";

interface StepExecution {
  stepId: string;
  output: string;
  isSuccess: boolean;
  isError: boolean;
}

type RecipeStoreState = {
  ticket?: string | null;
  authorizationCode?: string | null;
  token?: string | null;
  refreshToken?: string | null;
  completedSteps: string[];
  subject?: string;
  scopes?: string[];

  setTicket: (t?: string | null) => void;
  setAuthorizationCode: (c?: string | null) => void;
  setTokens: (token?: string | null, refreshToken?: string | null) => void;
  addCompletedStep: (stepId: string) => void;
  reset: () => void;

  executions: Record<string, StepExecution>;
  completeStep: (stepId: string, output: string) => void;
  failStep: (stepId: string, error: string) => void;
};

export const useRecipeStore = create<RecipeStoreState>((set) => ({
  ticket: null,
  authorizationCode: null,
  token: null,
  refreshToken: null,
  completedSteps: [],
  subject: "john",
  scopes: ["history.read", "timeline.read"],
  executions: {},

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
      executions: {},
    }),

  completeStep: (stepId, output) =>
    set((state) => ({
      executions: {
        ...state.executions,
        [stepId]: {
          stepId,
          output,
          isSuccess: true,
          isError: false,
        },
      },
    })),

  failStep: (stepId, error) =>
    set((state) => ({
      executions: {
        ...state.executions,
        [stepId]: {
          stepId,
          output: error,
          isSuccess: false,
          isError: true,
        },
      },
    })),
}));
