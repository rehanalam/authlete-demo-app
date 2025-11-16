"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RecipeContentProps {
  markdown: string;
}

export function RecipeContent({ markdown }: RecipeContentProps) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>;
}

export default RecipeContent;
