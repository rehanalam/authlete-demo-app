"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  data: unknown;
}

export default function RunnerOutput({ isError, isSuccess, error, data }: Props) {
  const [copied, setCopied] = useState(false);

  if (!isError && !isSuccess) return null;

  const output = isError ? JSON.stringify(error, null, 2) : JSON.stringify(data, null, 2);
  const tagText = isError ? "ERROR" : "SUCCESS";
  const tagColor = isError ? "bg-red-800/20 text-red-400" : "bg-green-800/20 text-green-400";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative p-2 border-t border-gray-800 bg-gray-900 flex flex-col">
      <div className="flex justify-between items-center mb-2 px-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${tagColor}`}>{tagText}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="flex items-center gap-1 border-gray-700 hover:bg-gray-800 "
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <pre className="text-sm text-white overflow-auto p-3 rounded bg-gray-900 max-h-48 scrollbar-dark">
        {output}
      </pre>
    </div>
  );
}
