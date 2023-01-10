import { useRichEditorData } from "../../../api/website-settings/richEditorApiTemplate";

import { Typography, Spin, Button } from "antd";
import RichTextReader from "../../components/custom-components/rich-editor/RichTextReader";

export default function TermConditions() {
  const { data, loading, method } = useRichEditorData("terms-conditions");

  return (
    <>
      <div className="custom_website-settings">
        <Typography.Title level={4}>Syarat dan Ketentuan</Typography.Title>
        {loading ? (
          <Spin />
        ) : (
          <>
            <RichTextReader value={data.value} />
          </>
        )}
      </div>
    </>
  );
}
