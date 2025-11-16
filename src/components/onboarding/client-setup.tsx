"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Smartphone } from "lucide-react";
import { useCreateClient } from "@/hooks/useClient";
import { useOnboardingStore } from "@/stores/oboarding-store";

import { Title } from "@/components/ui/title";
import { Text } from "@/components/ui/text";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { CLIENT_TYPES, APPLICATION_TYPES } from "@/types";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const clientSchema = z.object({
  clientName: z
    .string()
    .min(1, "Client name is required")
    .max(100, "Client name must be less than 100 characters"),
  clientId: z.string().optional(),
  description: z.string().max(200).optional(),
  clientType: z.enum(["PUBLIC", "CONFIDENTIAL"]),
  applicationType: z.enum(["WEB", "NATIVE"]).optional(),
  redirectUrisText: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

interface ClientSetupStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ClientSetupStep({ onNext, onBack }: ClientSetupStepProps) {
  const createClientMutation = useCreateClient();
  const { serviceId, setClient } = useOnboardingStore();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      clientName: "",
      clientId: "",
      description: "",
      clientType: "CONFIDENTIAL",
      applicationType: "WEB",
      redirectUrisText: "",
    },
  });

  const clientType = watch("clientType");

  const onSubmit = async (data: ClientFormData) => {
    if (!serviceId) return;

    try {
      const redirectUris = data.redirectUrisText
        ?.split("\n")
        .map((uri) => uri.trim())
        .filter(Boolean);

      const result = await createClientMutation.mutateAsync({
        clientName: data.clientName,
        clientId: data.clientId || undefined,
        description: data.description,
        clientType: data.clientType,
        applicationType: data.applicationType || "WEB",
        redirectUris,
        serviceId,
      });

      if (result.success && result.client.clientId) {
        setClient(result.client.clientId.toString());
        onNext();
      }
    } catch (error: unknown) {
      console.error("Failed to create client:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Smartphone className="w-8 h-8 text-green-600" />
        </div>
        <Title level={2} className="mb-2">
          Client Setup
        </Title>
        {serviceId && <Text>Service Number: {serviceId}</Text>}
        <Text className="text-gray-600">
          Configure the OAuth client that will authenticate users and request access to protected
          resources.
        </Text>
      </div>

      {createClientMutation.isError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {createClientMutation.error?.message || "Failed to create client. Please try again."}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="clientName">Client Name *</Label>
          <Input
            id="clientName"
            type="text"
            placeholder="Sample Client"
            {...register("clientName")}
          />
          {errors.clientName && (
            <Text className="text-red-600 text-sm">{errors.clientName.message}</Text>
          )}
        </div>

        <div>
          <Label htmlFor="clientId">Client ID (Optional)</Label>
          <Input id="clientId" type="text" placeholder="0123456789" {...register("clientId")} />
          {errors.clientId && (
            <Text className="text-red-600 text-sm">{errors.clientId.message}</Text>
          )}
        </div>

        <div>
          <Label htmlFor="description">Client Description</Label>
          <Textarea
            id="description"
            placeholder="Friendly description for this client"
            rows={2}
            {...register("description")}
          />
          {errors.description && (
            <Text className="text-red-600 text-sm">{errors.description.message}</Text>
          )}
        </div>

        <div>
          <Label>Client Type *</Label>
          <Controller
            control={control}
            name="clientType"
            render={({ field }) => (
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
                <SelectContent>
                  {CLIENT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.clientType && (
            <Text className="text-red-600 text-sm">{errors.clientType.message}</Text>
          )}
        </div>

        <div>
          <Label>Application Type</Label>
          <Controller
            control={control}
            name="applicationType"
            render={({ field }) => (
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue placeholder="Select application type" />
                </SelectTrigger>
                <SelectContent>
                  {APPLICATION_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.applicationType && (
            <Text className="text-red-600 text-sm">{errors.applicationType.message}</Text>
          )}
        </div>

        <div>
          <Label htmlFor="redirectUrisText">Redirect URIs (Optional)</Label>
          <Textarea
            id="redirectUrisText"
            rows={4}
            placeholder="https://example.com/callback\nhttps://example.com/oauth/callback"
            {...register("redirectUrisText")}
          />
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <Button variant="outline" onClick={onBack} disabled={createClientMutation.isPending}>
            Back
          </Button>
          <Button type="submit" disabled={createClientMutation.isPending}>
            {createClientMutation.isPending ? "Creating Client..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
