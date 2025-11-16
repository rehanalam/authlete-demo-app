import { Recipe } from "../../../types/recipe";

export default async function loadRecipe(id: string): Promise<Recipe | null> {
  try {
    const { recipe } = await import(`./${id}.ts`);
    return recipe as Recipe;
  } catch {
    return null;
  }
}
