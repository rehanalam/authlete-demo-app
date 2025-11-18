import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface RecipeContentProps {
  markdown: string;
}

const markdownComponents: Components = {
  h1: ({ ...props }) => <h1 {...props} className="text-3xl font-bold mb-6 mt-8 scroll-mt-20" />,
  h2: ({ ...props }) => <h2 {...props} className="text-2xl font-semibold mb-4 mt-6 scroll-mt-20" />,
  h3: ({ ...props }) => <h3 {...props} className="text-xl font-semibold mb-3 mt-5 scroll-mt-20" />,
  p: ({ ...props }) => <p {...props} className="text-base leading-relaxed mb-4" />,
  li: ({ ...props }) => <li {...props} className="ml-5 list-disc mb-2" />,
  code: ({ children }) => {
    return <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">{children}</code>;
  },
};

export default function RecipeContent({ markdown }: RecipeContentProps) {
  return (
    <div className="w-full overflow-auto ">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
