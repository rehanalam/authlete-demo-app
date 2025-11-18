"use client";

import { Button } from "@/components/ui/button";

interface RunnerFooterProps {
  prevStepId: string | null;
  onBack: () => void;
  onExecute: () => void;
  executeLabel?: string;
  isPending?: boolean;
}

export default function RunnerFooter({
  prevStepId,
  onBack,
  onExecute,
  executeLabel = "Execute",
  isPending = false,
}: RunnerFooterProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 border-t border-gray-700">
      <Button
        className={`px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white ${
          !prevStepId ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onBack}
        disabled={!prevStepId}
      >
        Back
      </Button>

      <Button
        className={`px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onExecute}
        disabled={isPending}
      >
        {isPending ? "Running..." : executeLabel}
      </Button>
    </div>
  );
}
