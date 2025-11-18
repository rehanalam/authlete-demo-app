import loadRecipe from "@/lib/recipe/loadRecipe";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import RecipeContent from "@/components/recipes/recipe-content";
import RecipeSidebar from "@/components/recipes/recipe-sidebar";
import CodeRunner from "@/components/recipes/code-runner/code-runner";
import { loadMarkdownFromPublic } from "@/lib/loadMarkdown";
import RecipeFooter from "@/components/recipes/code-runner/recipe-footer";

interface RecipePageProps {
  params: {
    id: string;
    organizationId: string;
  };
  searchParams: {
    step?: string; // optional
  };
}

export default async function RecipePage({ params, searchParams }: RecipePageProps) {
  const { id: recipeId, organizationId } = await params;
  const { step: stepParam = "" } = await searchParams;

  const recipe = await loadRecipe(recipeId);
  if (!recipe) return notFound();

  const currentStepId = stepParam || recipe.steps[0].id;
  const stepIndex = recipe.steps.findIndex((s) => s.id === currentStepId);
  const step = recipe.steps[stepIndex] || recipe.steps[0];

  if (!step) return notFound();

  const nextStep = recipe.steps[stepIndex + 1] ?? null;
  const prevStep = recipe.steps[stepIndex - 1] ?? null;

  const file = await loadMarkdownFromPublic(step.contentPath);
  if (!file) return notFound();
  const { content: markdown } = matter(file);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-64px)]">
      <div className="flex flex-1 overflow-hidden">
        <aside className="flex-none w-1/5 border-r h-full overflow-auto">
          <RecipeSidebar recipe={recipe} currentStepId={currentStepId} />
        </aside>

        <main className="flex-1 flex  overflow-auto">
          <div className="flex-1 overflow-auto p-8 ">
            <RecipeContent markdown={markdown} />
          </div>

          {step.type === "reference" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <CodeRunner step={step} />
            </div>
          )}
        </main>
      </div>

      <RecipeFooter
        recipeId={recipeId}
        organizationId={organizationId}
        currentStep={step}
        nextStep={nextStep}
        prevStep={prevStep}
        stepIndex={stepIndex}
        totalSteps={recipe.steps.length}
      />
    </div>
  );
}
