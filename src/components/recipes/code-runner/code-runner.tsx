"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReferenceStep } from "@/types/recipe";
import { useExecuteRecipeStep } from "@/hooks/useRecipeExecution";
import RunnerFooter from "./code-runner-footer";
import CodeRunnerHeader from "./code-runner-header";
import RunnerOutput from "./code-runner-output";
import CodeViewer from "./code-viewer";
import { useRecipeStore } from "@/stores/recipe-store";

interface CodeRunnerProps {
  step: ReferenceStep;
  nextStepId: string | null;
  prevStepId: string | null;
}

export default function CodeRunner({ step, nextStepId, prevStepId }: CodeRunnerProps) {
  const router = useRouter();
  const { mutate, isPending, isError, isSuccess, data, error } = useExecuteRecipeStep();
  const { completedSteps } = useRecipeStore();

  const [language, setLanguage] = useState("typescript");
  const [copied, setCopied] = useState(false);

  const example = step.codeSamples[0]?.code ?? "// No sample";

  // Determine if this step was already completed
  const stepAlreadyCompleted = completedSteps.includes(step.id);

  useEffect(() => {
    if (isSuccess && nextStepId) {
      router.push(`?step=${nextStepId}`);
    }
  }, [isSuccess]);

  const handleCopy = () => {
    navigator.clipboard.writeText(example);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col h-full border overflow-hidden bg-gray-900">
      <CodeRunnerHeader
        language={language}
        onLanguageChange={setLanguage}
        copied={copied}
        onCopy={handleCopy}
      />
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <CodeViewer language={language} code={example} />
      </div>
      <RunnerOutput
        isError={isError}
        isSuccess={isSuccess}
        error={error}
        data={stepAlreadyCompleted ? "Step Completed" : data}
      />
      <RunnerFooter
        prevStepId={prevStepId}
        onBack={() => prevStepId && router.push(`?step=${prevStepId}`)}
        onExecute={
          stepAlreadyCompleted
            ? () => nextStepId && router.push(`?step=${nextStepId}`)
            : () => mutate({ step })
        }
        executeLabel={stepAlreadyCompleted ? "Next" : "Execute"}
        isPending={isPending}
      />
    </div>
  );
}
