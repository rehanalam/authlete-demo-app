"use client";

import React, { useState } from "react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Title } from "../ui/title";
import { OnboardingSuccess } from "./onboarding-success";
import ServiceSetup from "./service-setup";
import ClientSetup from "./client-setup";

interface OnboardingWizardProps {
  organizationId: string;
}

export function OnboardingWizard({ organizationId }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    {
      title: "Service Setup",
      component: (
        <ServiceSetup organizationId={organizationId} onNext={nextStep} onBack={prevStep} />
      ),
    },
    {
      title: "Client Setup",
      component: <ClientSetup onNext={nextStep} onBack={prevStep} />,
    },
    {
      title: "Success",
      component: <OnboardingSuccess organizationId={organizationId} onBack={prevStep} />,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow rounded">
      <div className="flex items-center">
        <Title level={2} className="flex-2">
          Setup Authlete
        </Title>
        <div className="flex gap-2 flex-1 items-center">
          <p className="w-40 text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </p>

          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2 rounded-full" />
        </div>
      </div>

      <div className="pt-4">{steps[currentStep].component}</div>

      {/* TODO: USING FOR DEV TESTING */}
      {/* <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
          Back
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={() => alert("Wizard Complete!")}>Finish</Button>
        )}
      </div> */}
    </div>
  );
}
