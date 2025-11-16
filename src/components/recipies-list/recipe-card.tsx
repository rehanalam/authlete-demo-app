import { Card, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Recipe } from "../../../types/recipe";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";

interface RecipeCardProps {
  recipe: Pick<Recipe, "id" | "title" | "description">;
  organizationId: string;
}

export default function RecipeCard({ recipe, organizationId }: RecipeCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all py-8 px-4 rounded-xl flex-1">
      <CardHeader className="flex flex-col gap-1">
        <Title level={2}>{recipe.title} - Recipe</Title>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Link href={`/organization/${organizationId}/recipes/${recipe.id}`}>
          <Button>Start</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
