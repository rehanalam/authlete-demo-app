/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { ReferenceStep } from "@/types/recipe";
import { useRecipeStore } from "@/stores/recipe-store";
import { useOnboardingStore } from "@/stores/oboarding-store";

interface ExecuteStepInput {
  step: ReferenceStep;
}

export function useExecuteRecipeStep() {
  const recipeStore = useRecipeStore();
  const onboardingStore = useOnboardingStore();

  return useMutation({
    mutationFn: async ({ step }: ExecuteStepInput) => {
      const body: Record<string, any> = {};
      step.apiConfig.parameters.forEach((param) => {
        if (param in onboardingStore) body[param] = (onboardingStore as any)[param];
        else if (param in recipeStore) body[param] = (recipeStore as any)[param];
        else body[param] = "";
      });

      try {
        const response = await apiClient.post(step.apiConfig.url, body);
        return response.data;
      } catch (err: any) {
        throw err.response?.data || err;
      }
    },
    onSuccess: (data, { step }) => {
      step.apiConfig.saveResponse.forEach((save) => {
        const value = save.from.split(".").reduce((acc, key: string) => acc?.[key], data);

        switch (save.to) {
          case "ticket":
            recipeStore.setTicket(value);
            break;
          case "authorizationCode":
            recipeStore.setAuthorizationCode(value?.toString());
            break;
          case "token":
            recipeStore.setTokens(value, recipeStore.refreshToken);
            break;
        }
      });

      // Mark step completed
      recipeStore.addCompletedStep(step.id);

      // Save full API response for output window
      recipeStore.completeStep(step.id, data);
    },
    onError: (err: any, { step }) => {
      // Save error response in executions
      recipeStore.failStep(step.id, err);
    },
  });
}
