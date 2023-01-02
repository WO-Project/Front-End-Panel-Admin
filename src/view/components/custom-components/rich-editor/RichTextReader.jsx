import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./style.css";

export default function RichTextReader({ value, style }) {
  return (
    <ReactQuill
      value={value}
      style={style}
      modules={{ toolbar: false }}
      readOnly
    />
  );
}
