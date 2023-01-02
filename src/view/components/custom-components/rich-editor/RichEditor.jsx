import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./style.css";

export default function RichEditor({
  controlledValueState,
  controlledValueDispatcher,
}) {
  return (
    <ReactQuill
      theme="snow"
      value={controlledValueState}
      onChange={(e) => controlledValueDispatcher(e)}
      className="custom-rich-editor"
    />
  );
}
