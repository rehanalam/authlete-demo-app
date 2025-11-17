import RecipeCard from "@/components/recipies-list/recipe-card";

interface RecipesPageProps {
  params: {
    organizationId: string;
  };
}

const recipes = [
  {
    id: "oauth-recipe",
    title: "OAuth Basic Flow",
    description: "Simple OAuth authorization code flow.",
  },
  {
    id: "oauth-advanced",
    title: "OAuth Advanced Flow",
    description: "Advanced OAuth flow with PKCE and custom scopes.",
  },
];

export default async function RecipesPage({ params }: RecipesPageProps) {
  const { organizationId } = await params;

  return (
    <div className="w-full max-w-3/4 flex items-center justify-between mx-auto gap-4 mt-12">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} organizationId={organizationId} />
      ))}
    </div>
  );
}
