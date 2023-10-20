import React from "react";
import PropTypes from "prop-types";
import MarkdownEditor from "@framework/components/markdown.editor";

const TextEditorTab = (props: any) => {
  const textChanged = (value: string) => {
    props.onChange(value);
  };

  return (
    <MarkdownEditor
      id={props.id}
      originalText={props.text}
      onChange={textChanged}
    />
  );
};

TextEditorTab.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default TextEditorTab;
