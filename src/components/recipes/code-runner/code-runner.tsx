"use client";

import { useState } from "react";
import { ReferenceStep } from "@/types/recipe";
import CodeViewer from "./code-viewer";
import CodeRunnerHeader from "./code-runner-header";
import RunnerOutput from "./code-runner-output";
import { useRecipeStore } from "@/stores/recipe-store";

interface Props {
  step: ReferenceStep;
}

export default function CodeRunner({ step }: Props) {
  const [language, setLanguage] = useState("typescript");
  const [copied, setCopied] = useState(false);
  const example = step.codeSamples[0]?.code ?? "// No sample";

  const execution = useRecipeStore((state) => state.executions[step.id]);

  return (
    <div className="flex flex-col h-full border overflow-hidden bg-gray-900">
      <CodeRunnerHeader
        language={language}
        copied={copied}
        onLanguageChange={setLanguage}
        onCopy={() => {
          navigator.clipboard.writeText(example);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      />

      <div className="flex-1 overflow-auto bg-gray-900">
        <CodeViewer language={language} code={example} />
      </div>

      {execution && (
        <RunnerOutput
          data={execution.output}
          isError={execution.isError}
          isSuccess={execution.isSuccess}
        />
      )}
    </div>
  );
}
