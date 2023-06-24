import React, { useCallback, useMemo } from "react";
import { createEditor, Descendant, Editor, Element, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { CustomElement } from "../../types/slate";

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const CodeElement = (props) => {
  return (
    <pre className="text-red-500" {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const PillElement = (props) => {
  return (
    <div className="flex rounded-sm outline outline-white outline-1 mx-1 gap-x-1 max-w-full flex">
      <div
        contentEditable={false}
        className="px-2 select-none pointer-events-none text-sm bg-blue-500 text-black"
      >
        {props.element.key}
      </div>
      <p className="pr-2 break-all" {...props.attributes}>
        {props.children}
      </p>
    </div>
  );
};

const CommandsElement = (props) => {
  return (
    <div
      className="flex flex-wrap"
      {...props.attributes}
      data-trailing-placeholder="+6 more"
    >
      {props.children}
      <span
        contentEditable={false}
        className="ml-4 opacity-50 select-none pointer-events-none"
      >
        6+ more
      </span>
    </div>
  );
};

const SlateEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type as CustomElement["type"]) {
      case "code":
        return <CodeElement {...props} />;
      case "pill":
        return <PillElement {...props} />;
      case "commands":
        return <CommandsElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <div className="pt-20 max-w-[400px] mx-auto">
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          renderElement={renderElement}
          className="p-4"
          style={{ whiteSpace: "pre-wrap" }}
          onKeyDown={(e) => {
            // If there are some pills prevent default
            if (e.key === "Enter") {
              e.preventDefault();

              console.log("submit");
            }

            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
            }

            if (e.key === "Tab") {
              e.preventDefault();
              editor.move({
                unit: "word",
              });
            }

            if (e.key === "Tab" && e.shiftKey) {
              e.preventDefault();
              editor.move({
                unit: "word",
                reverse: true,
              });
            }

            if (e.key === "`" && e.ctrlKey) {
              // Prevent the "`" from being inserted by default.
              e.preventDefault();
              // Determine whether any of the currently selected blocks are code blocks.
              const [match] = Editor.nodes(editor, {
                match: (n) => Element.isElement(n) && n.type === "code",
              });

              // Otherwise, set the currently selected blocks type to "code".
              Transforms.setNodes(
                editor,
                { type: match ? "paragraph" : "code" },
                {
                  match: (n) =>
                    Element.isElement(n) && Editor.isBlock(editor, n),
                },
              );
            }
          }}
          placeholder="Enter some plain text..."
        />
      </Slate>
    </div>
  );
};

const initialValue: Descendant[] = [
  {
    type: "commands",
    children: [
      {
        type: "paragraph",
        children: [
          {
            text: "/imagine",
          },
        ],
      },
      {
        type: "pill",
        children: [
          {
            text: "english",
          },
        ],
        key: "lang",
      },
      {
        type: "pill",
        children: [
          {
            text: "short",
          },
        ],
        key: "explanation",
      },
      {
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
      },
    ],
  },
];

export default SlateEditor;
