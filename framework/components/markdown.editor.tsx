import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SimpleMdeReact } from "react-simplemde-editor";
import ReactMarkdown from "react-markdown";
import { renderToString } from "react-dom/server";
import { Editor } from "codemirror";

const MarkdownEditor = (props: any) => {
  const [original] = useState<string>(props.originalText ?? "");
  const renderPreview = (value: string) => {
    return renderToString(<ReactMarkdown>{value}</ReactMarkdown>);
  };

  const options = useMemo(() => {
    return {
      autoDownloadFontAwesome: true,
      autofocus: true,
      spellChecker: false,
      previewRender: renderPreview,
      hideIcons: ["side-by-side", "fullscreen"],
    };
  }, []);

  const changed = (value: string | null) => {
    props.onChange(value ?? "");
  };

  // codemirror
  const [codemirrorInstance, setCodemirrorInstance] = useState<Editor | null>(
    null
  );
  const getCmInstanceCallback = useCallback((editor: Editor) => {
    setCodemirrorInstance(editor);
  }, []);

  useEffect(() => {
    if (codemirrorInstance) {
      console.info("Hey I'm codemirror instance!", codemirrorInstance);
      codemirrorInstance?.refresh();
      codemirrorInstance.scrollTo(0, 0);
    }
  }, [codemirrorInstance]);

  return (
    <SimpleMdeReact
      getCodemirrorInstance={getCmInstanceCallback}
      id={props.id}
      key={props.id}
      value={original}
      onChange={changed}
      // @ts-ignore
      options={options}
    />
  );
};

MarkdownEditor.propTypes = {
  id: PropTypes.string.isRequired,
  originalText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default MarkdownEditor;
