import loadRecipe from "@/lib/recipe/loadRecipe";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import RecipeContent from "@/components/recipes/recipe-content";
import RecipeSidebar from "@/components/recipes/recipe-sidebar";
import CodeRunner from "@/components/recipes/code-runner";

interface RecipePageProps {
  params: {
    id: string;
  };
  searchParams: {
    step?: string; // optional
  };
}

export default async function RecipePage({ params, searchParams }: RecipePageProps) {
  const { id: recipeId } = await params;
  const { step: stepParam = "" } = await searchParams;

  const recipe = await loadRecipe(recipeId);
  if (!recipe) return notFound();

  const currentStepId = stepParam ?? recipe.steps[0].id;

  const step = recipe.steps.find((s) => s.id === currentStepId) || recipe.steps[0];
  if (!step) return notFound();

  const stepIndex = recipe.steps.findIndex((s) => s.id === step.id);
  const nextStep = recipe.steps[stepIndex + 1] ?? null;

  const res = await fetch(`http://localhost:3000/${step.contentPath}`);
  if (!res.ok) return notFound();

  const file = await res.text();
  const { content: markdown, data: frontMatter } = matter(file);

  return (
    <>
      <aside className="w-64 border-r">
        <RecipeSidebar recipe={recipe} currentStepId={currentStepId} />
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <RecipeContent markdown={markdown} />
      </main>

      <aside className="w-2/5 border-l p-6">
        {step.type === "reference" && <CodeRunner step={step} nextStepId={nextStep?.id ?? null} />}
      </aside>
    </>
  );
}
