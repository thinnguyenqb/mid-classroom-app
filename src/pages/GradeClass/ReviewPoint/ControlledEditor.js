import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./textEditor.css";

const ControlledEditor = ({ value, setValue }) => {
  return (
    <div className="text-editor">
      <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="Explanation message" />
    </div>
  );
};

export default ControlledEditor;
