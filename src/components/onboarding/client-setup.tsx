"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateClient } from "@/hooks/useClient";
import { useOnboardingStore } from "@/stores/oboarding-store";

import { Title } from "@/components/ui/title";
import { Text } from "@/components/ui/text";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { CLIENT_TYPES, APPLICATION_TYPES } from "@/types";

const clientSchema = z.object({
  clientName: z.string().min(1, "Client name is required").max(100),
  clientId: z.string().optional(),
  description: z.string().max(200).optional(),
  clientType: z.enum(["PUBLIC", "CONFIDENTIAL"]),
  applicationType: z.enum(["WEB", "NATIVE"]).optional(),
  redirectUrisText: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

export default function ClientSetupStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const createClientMutation = useCreateClient();
  const { serviceId, setClient } = useOnboardingStore();

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      clientName: "",
      clientId: "",
      description: "",
      clientType: "PUBLIC",
      applicationType: "WEB",
      redirectUrisText: "https://my-client.example.com/cb1",
    },
  });

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

      if (result.success && result.client) {
        setClient({
          clientId: result.client.clientId?.toString(),
          clientIdAlias: result.client.clientIdAlias?.toString(),
          clientSecret: result.client.clientSecret?.toString(),
        });

        onNext();
      }
    } catch (err) {
      console.error("Failed to create client:", err);
    }
  };

  return (
    <div className="w-1xl mx-auto">
      <div className="text-center mb-8">
        <Title level={2} className="mb-2">
          Client Setup
        </Title>
        <Text className="text-gray-600">
          Configure the OAuth client that will authenticate users and request access.
        </Text>
      </div>

      {createClientMutation.isError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {createClientMutation.error?.message || "Failed to create client. Please try again."}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Sample Client" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client ID (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="0123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder="Friendly description for this client"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Up to 200 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Type *</FormLabel>
                <FormControl>
                  <Select disabled onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select client type" />
                    </SelectTrigger>
                    <SelectContent className="min-w-full">
                      {CLIENT_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Note: Disabled for demo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="applicationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select application type" />
                    </SelectTrigger>
                    <SelectContent className="min-w-full">
                      {APPLICATION_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="redirectUrisText"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Redirect URIs (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder={`https://example.com/callback\nhttps://example.com/oauth/callback`}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Note: Disabled for demo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-4 pt-4">
            <Button variant="outline" onClick={onBack} disabled={createClientMutation.isPending}>
              Back
            </Button>
            <Button type="submit" disabled={createClientMutation.isPending}>
              {createClientMutation.isPending ? "Creating Client..." : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
