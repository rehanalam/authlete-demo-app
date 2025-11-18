"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Title } from "../ui/title";
import { Text } from "../ui/text";
import Link from "next/link";
import { useOnboardingStore } from "@/stores/oboarding-store";

interface OnboardingSuccessProps {
  organizationId: string;
  onBack: () => void;
}

export function OnboardingSuccess({ organizationId, onBack }: OnboardingSuccessProps) {
  const { serviceId, clientId } = useOnboardingStore();

  return (
    <div className="w-1xl mx-auto text-center space-y-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <Title level={2}>Setup Complete!</Title>
      <Text className="text-gray-600">
        You have successfully created your service and OAuth client.
      </Text>

      <div className="flex flex-col  bg-green-50 border border-green-200 p-4 rounded-lg text-left gap-4">
        <Text className="font-semibold text-green-800 mb-1">Service & Client Info:</Text>

        <div className="flex flex-col gap-2">
          {serviceId && <Text> Service Id: {serviceId}</Text>}
          {clientId && <Text> Client ID: {clientId}</Text>}
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Link href={`/organization/${organizationId}/recipes/oauth-recipe`}>
          <Button>Start Recipe</Button>
        </Link>
      </div>
    </div>
  );
}
