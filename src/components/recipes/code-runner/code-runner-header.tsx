"use client";

import { Copy, Check } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

const LANGUAGES = ["typescript", "java", "go"];

interface HeaderProps {
  language: string;
  copied: boolean;
  onLanguageChange: (lang: string) => void;
  onCopy: () => void;
}

export default function CodeRunnerHeader({
  language,
  copied,
  onLanguageChange,
  onCopy,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2  bg-transparent">
      <Select value={language} onValueChange={onLanguageChange}>
        <SelectTrigger className="text-white">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {LANGUAGES.map((lang) => (
            <SelectItem
              key={lang}
              value={lang}
              className="data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-700"
            >
              {lang.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="secondary" size="sm" onClick={onCopy} className="flex items-center gap-1">
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
