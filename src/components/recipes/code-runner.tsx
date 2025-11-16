/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReferenceStep } from "../../../types/recipe";

interface CodeRunnerProps {
  step: ReferenceStep;
  nextStepId: string | null;
}

export default function CodeRunner({ step, nextStepId }: CodeRunnerProps) {
  const router = useRouter();
  const [error, setError] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(step.apiConfig.url, {
        method: step.apiConfig.method,
        headers: step.apiConfig.headers,
        body: step.apiConfig.bodyTemplate,
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json);
        setLoading(false);
        return;
      }

      setResult(json);
      setLoading(false);

      if (nextStepId) {
        router.push(`?step=${nextStepId}`);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  const example = step.codeSamples[0]?.code ?? "// No sample";

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-gray-900 p-4 rounded ">
        <pre className=" text-white  text-sm overflow-x-auto">{example}</pre>
      </div>

      <button disabled={loading} onClick={run} className="px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? "Running…" : "Execute"}
      </button>

      {error && (
        <pre className="bg-red-100 text-red-800 p-3 rounded">{JSON.stringify(error, null, 2)}</pre>
      )}

      {result && (
        <pre className="bg-green-100 text-green-800 p-3 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
