import { useRichEditorData } from "../../../api/website-settings/richEditorApiTemplate";

import { Typography, Spin, Button } from "antd";
import RichEditor from "../../components/custom-components/rich-editor/RichEditor";
import RichTextReader from "../../components/custom-components/rich-editor/RichTextReader";

export default function PrivacyPolicies() {
  const { data, loading, method } = useRichEditorData("privacy-policies");

  return (
    <>
      <div className="custom_website-settings">
        <Typography.Title level={4}>Kebijakan Privasi</Typography.Title>
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
