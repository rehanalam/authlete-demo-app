import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  code: string;
  language: string;
}

export default function CodeViewer({ code, language }: Props) {
  return (
    <div className="h-full scrollbar-dark">
      <SyntaxHighlighter
        language={language}
        style={duotoneDark}
        wrapLines
        wrapLongLines
        customStyle={{ background: "transparent", margin: 0, height: "100%" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
