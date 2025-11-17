import loadRecipe from "@/lib/recipe/loadRecipe";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import RecipeContent from "@/components/recipes/recipe-content";
import RecipeSidebar from "@/components/recipes/recipe-sidebar";
import CodeRunner from "@/components/recipes/code-runner/code-runner";

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

  const currentStepId = stepParam || recipe.steps[0].id;
  const step = recipe.steps.find((s) => s.id === currentStepId) || recipe.steps[0];
  if (!step) return notFound();

  const stepIndex = recipe.steps.findIndex((s) => s.id === step.id);
  const nextStep = recipe.steps[stepIndex + 1] ?? null;
  const prevStep = recipe.steps[stepIndex - 1] ?? null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}${step.contentPath}`);
  if (!res.ok) return notFound();

  const file = await res.text();
  const { content: markdown, data: frontMatter } = matter(file);

  return (
    <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
      <aside className="flex-none w-1/5 border-r h-full overflow-auto">
        <RecipeSidebar recipe={recipe} currentStepId={currentStepId} />
      </aside>

      <main className={`overflow-auto p-8 ${step.type === "reference" ? "w-2/5" : "w-4/5"}`}>
        <RecipeContent markdown={markdown} />
      </main>

      {step.type === "reference" && (
        <aside className="flex-none w-2/5 border-l h-full flex flex-col">
          <div className="flex-1 overflow-auto">
            <CodeRunner
              step={step}
              nextStepId={nextStep?.id ?? null}
              prevStepId={prevStep?.id ?? null}
            />
          </div>
        </aside>
      )}
    </div>
  );
}
