import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CODE_THEME = dracula;

interface Props {
  code: string;
  language: string;
}

export default function CodeViewer({ code, language }: Props) {
  return (
    <div className="h-full scrollbar-dark">
      <SyntaxHighlighter
        language={language}
        style={dracula}
        wrapLines
        wrapLongLines
        customStyle={{ background: "transparent", margin: 0, height: "100%" }}
        className="text-sm"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
