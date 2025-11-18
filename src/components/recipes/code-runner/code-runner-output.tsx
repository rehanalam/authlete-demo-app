"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CODE_THEME } from "./code-viewer";

interface RunnerOutputProps {
  data?: unknown;
  isError?: boolean;
  isSuccess?: boolean;
}

export default function RunnerOutput({
  data,
  isError = false,
  isSuccess = false,
}: RunnerOutputProps) {
  const [copied, setCopied] = useState(false);

  if (!isError && !isSuccess) return null;

  const serialized = typeof data === "string" ? data : JSON.stringify(data ?? {}, null, 2);
  const output = serialized ?? "";
  const tagText = isError ? "ERROR" : "RESPONSE";
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
          className="flex items-center gap-1"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <SyntaxHighlighter
        language="json"
        style={CODE_THEME}
        wrapLongLines
        customStyle={{
          background: "transparent",
          margin: 0,
          padding: "12px",
          maxHeight: "16rem",
        }}
        className="text-sm text-white overflow-auto rounded bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {output}
      </SyntaxHighlighter>
    </div>
  );
}
