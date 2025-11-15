"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Server } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { IconWrapper } from "../ui/icon-wrap";
import { Input } from "../ui/input";
import { Text } from "../ui/text";
import { Title } from "../ui/title";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Textarea } from "../ui/textarea";
import { API_CLUSTERS } from "../../../types";
import { useCreateService } from "@/hooks/userService";
import { useOnboardingStore } from "@/stores/oboarding-store";

const serviceSchema = z.object({
  serviceName: z
    .string()
    .min(1, "Service name is required")
    .max(100, "Service name must be less than 100 characters"),
  description: z.string().max(200, "Description must be less than 200 characters").optional(),
  cluster: z.string().min(1, "Please select an API cluster"),
  fapiEnabled: z.boolean().optional(),
});

type ServiceForm = z.infer<typeof serviceSchema>;

interface ServiceSetupStepProps {
  organizationId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function ServiceSetupStep({
  organizationId,
  onNext,
  onBack,
}: ServiceSetupStepProps) {
  const createServiceMutation = useCreateService();
  const { setService } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceName: "",
      description: "",
      cluster: "US",
      fapiEnabled: false,
    },
  });

  const selectedCluster = watch("cluster");

  const onSubmit = async (data: ServiceForm) => {
    try {
      const result = await createServiceMutation.mutateAsync({
        ...data,
        organizationId,
      });

      if (result.success && result.service?.apiKey) {
        setService(result.service.apiKey.toString());
        onNext();
      }
      console.error("submit to create service:", data);
    } catch (error: unknown) {
      console.error("Failed to create service:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <IconWrapper icon={Server} size={32} className="text-blue-600" />
        </div>
        <Title level={2} variant="lg" className="mb-2">
          Service Setup
        </Title>
        <Text variant="sm" color="text-gray-600">
          Configure your OAuth/OIDC service. The service defines authentication flows, token
          settings, and security policies.
        </Text>
      </div>

      {createServiceMutation.isError && (
        <Card className="mb-6 border-red-200 bg-red-50 text-red-700">
          <CardContent>
            {createServiceMutation.error?.message || "Failed to create service. Please try again."}
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        <div>
          <Label className="block mb-2">API Cluster *</Label>
          <Text variant="sm" color="text-gray-500" className="mb-3">
            The API Cluster you select will be the location of all data hosted for this service.
          </Text>
          <div className="grid grid-cols-4 gap-3">
            {API_CLUSTERS.map((cluster) => (
              <label
                key={cluster.value}
                className={`
                  relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${
                    selectedCluster === cluster.value
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <input
                  type="radio"
                  value={cluster.value}
                  {...register("cluster")}
                  className="sr-only"
                />
                <span className="text-2xl mb-1">{cluster.flag}</span>
                <span className="text-sm font-medium text-gray-900">{cluster.label}</span>
              </label>
            ))}
          </div>
          {errors.cluster && (
            <Text variant="sm" color="text-red-600">
              {errors.cluster.message}
            </Text>
          )}
        </div>

        <div>
          <Label htmlFor="serviceName">Service Name *</Label>
          <Input
            id="serviceName"
            type="text"
            placeholder="Sample Service"
            {...register("serviceName")}
          />
          <Text variant="sm" color="text-gray-500">
            The name of this service (up to 100 Unicode characters).
          </Text>
          {errors.serviceName && (
            <Text variant="sm" color="text-red-600">
              {errors.serviceName.message}
            </Text>
          )}
        </div>

        <div>
          <Label htmlFor="description">Service Description</Label>
          <Textarea
            id="description"
            rows={3}
            placeholder="Friendly description for this service"
            {...register("description")}
          />
          <Text variant="sm" color="text-gray-500">
            The description of this service (up to 200 Unicode characters).
          </Text>
          {errors.description && (
            <Text variant="sm" color="text-red-600">
              {errors.description.message}
            </Text>
          )}
        </div>

        <div>
          <Checkbox {...register("fapiEnabled")}>
            <Text variant="sm" fontWeight="medium">
              FAPI Profile
            </Text>
            <Text variant="sm" color="text-gray-500">
              Choose whether FAPI 1.0 and FAPI 2.0 settings may be applied to this service.
            </Text>
          </Checkbox>
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <Button variant="outline" onClick={onBack} disabled={createServiceMutation.isPending}>
            Back
          </Button>
          <Button type="submit" disabled={createServiceMutation.isPending}>
            {createServiceMutation.isPending ? "Creating Service..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
