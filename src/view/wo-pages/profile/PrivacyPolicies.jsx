import { useRichEditorData } from "../../../api/website-settings/richEditorApiTemplate";

import { Typography, Spin, Button } from "antd";
import RichEditor from "../../components/custom-components/rich-editor/RichEditor";

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
            <RichEditor
              controlledValueDispatcher={data.setValue}
              controlledValueState={data.value}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="primary"
                danger
                size="small"
                onClick={method.update}
              >
                Simpan
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
