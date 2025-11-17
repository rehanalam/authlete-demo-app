import loadRecipe from "@/lib/recipe/loadRecipe";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import RecipeContent from "@/components/recipes/recipe-content";
import RecipeSidebar from "@/components/recipes/recipe-sidebar";
import CodeRunner from "@/components/recipes/code-runner/code-runner";
import { loadMarkdownFromPublic } from "@/lib/loadMarkdown";

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

  let nextLabel = "Next";
  let nextHref = `/organization/${organizationId}/recipes/${recipeId}?step=${nextStep?.id ?? step.id}`;

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === recipe.steps.length - 1;

  if (isFirstStep) {
    nextLabel = "Start";
  } else if (isLastStep) {
    nextLabel = "Try Next Recipe";
    nextHref = `/organization/${organizationId}/recipes/oauth-recipe`;
  }

  return (
    <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
      <aside className="flex-none w-1/5 border-r h-full overflow-auto">
        <RecipeSidebar recipe={recipe} currentStepId={currentStepId} />
      </aside>
      <main
        className={`flex flex-col overflow-auto  ${step.type === "reference" ? "w-2/5" : "w-4/5"}`}
      >
        <div className="flex-1 overflow-auto p-8">
          <RecipeContent markdown={markdown} />
        </div>

        {step.type === "page" && (
          <div className="sticky bottom-0 z-10 flex justify-between items-center px-4 py-3 bg-white border-t">
            <a
              href={`/organization/${organizationId}`}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Back to Dashboard
            </a>
            <a
              href={nextHref}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              {nextLabel}
            </a>
          </div>
        )}
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
