"use client";

import Link from "next/link";
import { Recipe } from "@/types/recipe";
import { useRecipeStore } from "@/stores/recipe-store";
import { Check } from "lucide-react";

interface SidebarProps {
  recipe: Recipe;
  currentStepId: string;
}

export default function RecipeSidebar({ recipe, currentStepId }: SidebarProps) {
  const executions = useRecipeStore((s) => s.executions);

  return (
    <nav className="w-[280px] p-4 space-y-2">
      {recipe.steps.map((step) => {
        const isSuccess = executions[step.id]?.isSuccess;

        return (
          <Link
            key={step.id}
            href={`?step=${step.id}`}
            className={`flex items-center justify-between px-3 py-2 rounded ${
              step.id === currentStepId ? "bg-gray-200 font-medium" : "hover:bg-gray-50"
            }`}
          >
            <span>{step.title}</span>

            {isSuccess && <Check className="text-green-600 w-4 h-4" />}
          </Link>
        );
      })}
    </nav>
  );
}
