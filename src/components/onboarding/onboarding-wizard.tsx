"use client";

import React, { useState } from "react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Title } from "../ui/title";
import { ServiceSetup } from "./service-setup";
import { ClientSetup } from "./client-setup";
import { OnboardingSuccess } from "./onboarding-success";

export function OnboardingWizard() {
  const steps = [
    { title: "Service Setup", component: <ServiceSetup /> },
    { title: "Client Setup", component: <ClientSetup /> },
    { title: "Success", component: <OnboardingSuccess /> },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow rounded">
      <Title level={2}>Onboarding Wizard</Title>
      <p className="text-sm text-gray-600">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </p>

      <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2 rounded-full" />

      <div className="pt-4">{steps[currentStep].component}</div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
          Back
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={() => alert("Wizard Complete!")}>Finish</Button>
        )}
      </div>
    </div>
  );
}
