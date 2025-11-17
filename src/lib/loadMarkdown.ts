import { readFile } from "fs/promises";
import { join } from "path";

export async function loadMarkdownFromPublic(contentPath: string): Promise<string> {
  try {
    const normalizedPath = contentPath.startsWith("/") ? contentPath.slice(1) : contentPath;
    const publicPath = join(process.cwd(), "public", normalizedPath);
    const file = await readFile(publicPath, "utf-8");
    return file;
  } catch (fsError) {
    throw new Error(`Failed to load markdown file: ${contentPath} ${fsError}`);
  }
}
