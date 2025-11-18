"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRecipeStore } from "@/stores/recipe-store";
import { ReferenceStep, RecipeStep } from "@/types/recipe";
import { useExecuteRecipeStep } from "@/hooks/useRecipeExecution";

interface Props {
  recipeId: string;
  organizationId: string;
  currentStep: RecipeStep;
  nextStep: RecipeStep | null;
  prevStep: RecipeStep | null;
  stepIndex: number;
  totalSteps: number;
}

export default function RecipeFooter({
  recipeId,
  organizationId,
  currentStep,
  nextStep,
  prevStep,
  stepIndex,
  totalSteps,
}: Props) {
  const router = useRouter();
  const execution = useRecipeStore((state) => state.executions[currentStep.id]);

  const { mutate, isPending } = useExecuteRecipeStep();

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === totalSteps - 1;
  const stepAlreadyExecuted = !!execution;
  const stepSucceeded = execution?.isSuccess ?? false;

  const handlePrev = () => {
    if (prevStep) {
      router.push(`/organization/${organizationId}/recipes/${recipeId}?step=${prevStep.id}`);
    }
  };

  const handleNext = () => {
    if (nextStep) {
      router.push(`/organization/${organizationId}/recipes/${recipeId}?step=${nextStep.id}`);
    } else if (isLastStep) {
      router.push(`/organization/${organizationId}/recipes/oauth-recipe`);
    }
  };

  const handleExecute = async () => {
    if (currentStep.type !== "reference") return;
    await mutate({ step: currentStep as ReferenceStep });
  };

  return (
    <div className="flex justify-between p-4 border-t border-gray-700 bg-gray-800">
      <Button
        className="bg-gray-700 hover:bg-gray-600 text-white"
        onClick={handlePrev}
        disabled={isFirstStep}
      >
        Back
      </Button>

      {currentStep.type === "reference" ? (
        <div className="flex gap-2">
          <Button
            className={`bg-blue-600 hover:bg-blue-500 text-white`}
            onClick={handleExecute}
            disabled={isPending}
          >
            {stepAlreadyExecuted ? (stepSucceeded ? "Retry" : "Execute") : "Execute"}
          </Button>

          <Button
            className="bg-green-600 hover:bg-green-500 text-white"
            onClick={handleNext}
            disabled={!stepSucceeded}
          >
            Next
          </Button>
        </div>
      ) : (
        <Button className="bg-blue-600 hover:bg-blue-500 text-white" onClick={handleNext}>
          {isFirstStep ? "Start" : isLastStep ? "Try Next Recipe" : "Next"}
        </Button>
      )}
    </div>
  );
}
