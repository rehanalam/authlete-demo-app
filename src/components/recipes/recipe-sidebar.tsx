"use client";

import Link from "next/link";
import { Recipe } from "../../../types/recipe";

interface SidebarProps {
  recipe: Recipe;
  currentStepId: string;
}

export default function RecipeSidebar({ recipe, currentStepId }: SidebarProps) {
  return (
    <nav className="w-[300px] p-4 space-y-2">
      {recipe.steps.map((step) => (
        <Link
          key={step.id}
          href={`?step=${step.id}`}
          className={`block px-3 py-2 rounded ${
            step.id === currentStepId ? "bg-gray-200 font-medium" : "hover:bg-gray-50"
          }`}
        >
          {step.title}
        </Link>
      ))}
    </nav>
  );
}
