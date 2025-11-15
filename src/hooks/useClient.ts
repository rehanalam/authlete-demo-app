import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientFormData, AuthleteClient } from "../../types";

export const clientKeys = {
  all: ["clients"] as const,
  list: (serviceId: string) => [...clientKeys.all, "list", serviceId] as const,
};

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ClientFormData & { serviceId: string }) => {
      const response = await apiClient.post("/client", data);
      return response.data as {
        success: boolean;
        client: AuthleteClient;
      };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: clientKeys.list(variables.serviceId),
      });
    },
  });
}
