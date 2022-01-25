import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//import "./AssignmentTab/textEditor.scss";

const ControlledEditor = ({ value, setValue }) => {
  return (
    <div className="text-editor">
      <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="Class description" />
    </div>
  );
};

export default ControlledEditor;