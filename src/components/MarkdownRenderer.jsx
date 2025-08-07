import React from "react";
import { useToast } from "../notifications/ToastProvider";

const MarkdownRenderer = ({ markdown }) => {
    const {showToast} = useToast()
  const parseMarkdown = (text) => {
    const lines = text.split("\n");
    const elements = [];

    let inCodeBlock = false;
    let codeLines = [];

    const renderInline = (line, index) => {
  const inlineCodeRegex = /`([^`]+)`/g;
  const boldRegex = /\*\*(.*?)\*\*/g;

  let parts = [];
  let lastIndex = 0;
  let keyIndex = 0;

  // Handle inline code
  line.replace(inlineCodeRegex, (match, p1, offset) => {
    if (offset > lastIndex) {
      parts.push(line.slice(lastIndex, offset));
    }
    parts.push(
      <code
        key={`${index}-inline-${keyIndex++}`}
        className="bg-gray-200 px-1 py-0.5 rounded"
      >
        {p1}
      </code>
    );
    lastIndex = offset + match.length;
  });

  if (parts.length === 0) {
    parts.push(line); // no inline code found
  } else if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  // Now process each part for bold text
  const finalParts = [];
  parts.forEach((part, i) => {
    if (typeof part === "string") {
      let last = 0;
      let boldIndex = 0;

      part.replace(boldRegex, (match, p1, offset) => {
        if (offset > last) {
          finalParts.push(part.slice(last, offset));
        }
        finalParts.push(
          <strong key={`${index}-bold-${boldIndex++}`} className="font-bold">
            {p1}
          </strong>
        );
        last = offset + match.length;
      });

      if (last < part.length) {
        finalParts.push(part.slice(last));
      }
    } else {
      finalParts.push(part); // JSX element (like <code>)
    }
  });

  return finalParts;
};


    const copyToClipboard = async (code) => {
      try {
        await navigator.clipboard.writeText(code);
        showToast('Copied to clipboard!','success')
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    lines.forEach((line, index) => {
      if (line.trim().startsWith("```")) {
        inCodeBlock = !inCodeBlock;

        if (!inCodeBlock) {
          const codeContent = codeLines.join("\n");
          elements.push(
            <div key={index} className="relative">
              <button
                onClick={() => copyToClipboard(codeContent)}
                className="absolute top-2 right-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Copy
              </button>
              <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
          codeLines = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="text-xl font-semibold mt-4">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="text-2xl font-bold mt-6">
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.trim() === "---") {
        elements.push(<hr key={index} className="my-2 border-t" />);
      } else if (line.trim() === "") {
        elements.push(<br key={index} />);
      } else {
        elements.push(
          <p key={index} className="mt-2">
            {renderInline(line, index)}
          </p>
        );
      }
    });

    return elements;
  };

  return <div className="prose max-w-none">{parseMarkdown(markdown)}</div>;
};

export default MarkdownRenderer;