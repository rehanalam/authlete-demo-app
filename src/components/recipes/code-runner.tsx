"use client";

import { useRouter } from "next/navigation";
import { ReferenceStep } from "@/types/recipe";
import { useExecuteRecipeStep } from "@/hooks/useRecipeExecution";
import { useEffect } from "react";

interface CodeRunnerProps {
  step: ReferenceStep;
  nextStepId: string | null;
  prevStepId: string | null;
}

export default function CodeRunner({ step, nextStepId, prevStepId }: CodeRunnerProps) {
  const router = useRouter();

  const { mutate, isPending, isError, isSuccess, data, error } = useExecuteRecipeStep();
  const example = step.codeSamples[0]?.code ?? "// No sample";

  useEffect(() => {
    if (isSuccess && nextStepId) {
      router.push(`?step=${nextStepId}`);
    }
  }, [isSuccess]);

  const onBack = () => {
    if (prevStepId) {
      router.push(`?step=${prevStepId}`);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        <pre className=" bg-gray-900 text-white p-4 rounded overflow-auto">{example}</pre>
        <div className="flex-1">
          {isError && (
            <pre className="bg-red-100 text-red-800 p-3 rounded overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          )}

          {isSuccess && (
            <pre className="bg-green-100 text-green-800 p-3 rounded overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>

      <div className="flex justify-between p-4 border-t bg-white sticky bottom-0">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Back
        </button>
        <button
          onClick={() => mutate({ step })}
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {isPending ? "Running…" : "Execute"}
        </button>
      </div>
    </div>
  );
}
