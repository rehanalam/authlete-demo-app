"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox"; // You should use shadcn checkbox
import { Title } from "../ui/title";
import { Text } from "../ui/text";
import { API_CLUSTERS } from "@/types";
import { useCreateService } from "@/hooks/userService";
import { useOnboardingStore } from "@/stores/oboarding-store";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

const serviceSchema = z.object({
  serviceName: z.string().min(1, "Service name is required").max(100),
  description: z.string().max(200).optional(),
  cluster: z.string().min(1, "Please select an API cluster"),
  fapiEnabled: z.boolean().optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export default function ServiceSetupStep({
  organizationId,
  onNext,
  onBack,
}: {
  organizationId: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const createServiceMutation = useCreateService();
  const { setService } = useOnboardingStore();

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceName: "",
      description: "",
      cluster: "US",
      fapiEnabled: false,
    },
  });

  const onSubmit = async (data: ServiceFormData) => {
    try {
      const result = await createServiceMutation.mutateAsync({
        ...data,
        organizationId,
      });

      if (result.success && result.service?.apiKey) {
        setService(result.service.apiKey.toString());
        onNext();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-1xl mx-auto">
      <div className="text-center mb-8 w-[70%] mx-auto">
        <Title level={2} variant="lg" className="mb-2">
          Service Setup
        </Title>
        <Text variant="sm" color="text-gray-600">
          Configure your OAuth/OIDC service. The service defines authentication flows and policies.
        </Text>
      </div>

      {createServiceMutation.isError && (
        <Card className="mb-6 border-red-200 bg-red-50 text-red-700">
          <CardContent>
            {createServiceMutation.error?.message || "Failed to create service. Please try again."}
          </CardContent>
        </Card>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="cluster"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Cluster *</FormLabel>
                <FormDescription>
                  The API cluster determines where your data will be hosted.
                </FormDescription>

                <div className="grid grid-cols-4 gap-3 mt-2">
                  {API_CLUSTERS.map((cluster) => (
                    <label
                      key={cluster.value}
                      className={`
                        relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all
                        ${
                          field.value === cluster.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                      onClick={() => field.onChange(cluster.value)}
                    >
                      <span className="text-2xl mb-1">{cluster.flag}</span>
                      <span className="text-sm font-medium text-gray-900">{cluster.label}</span>
                    </label>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Sample Service" {...field} />
                </FormControl>
                <FormDescription>Up to 100 Unicode characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="Friendly description for this service"
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
            name="fapiEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>FAPI Profile</FormLabel>
                </div>
                <FormDescription>Enable FAPI 1.0 and 2.0 options for this service.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-4 pt-4">
            <Button variant="outline" onClick={onBack} disabled={createServiceMutation.isPending}>
              Back
            </Button>
            <Button type="submit" disabled={createServiceMutation.isPending}>
              {createServiceMutation.isPending ? "Creating Service..." : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
