import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthleteService } from "../types";
import { ServiceFormData } from "@/components/onboarding/service-setup";

export const serviceKeys = {
  all: ["services"] as const,
  list: (organizationId: string) => [...serviceKeys.all, "list", organizationId] as const,
};

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ServiceFormData & { organizationId: string }) => {
      const response = await apiClient.post("/service", data);
      return response.data as {
        success: boolean;
        service: AuthleteService;
      };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: serviceKeys.list(variables.organizationId),
      });
    },
  });
}
