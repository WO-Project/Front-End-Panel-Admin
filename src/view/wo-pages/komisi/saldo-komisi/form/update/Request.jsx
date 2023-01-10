import { useHistory } from "react-router-dom";

import { requestDisbursement } from "../../../../../../api/disbursement/requestDisbursement";

import { Form, Select, InputNumber, Button, Space, message } from "antd";

import CardForm from "../../../../../components/custom-components/form-crud/CardForm";

export default function Request() {
  const history = useHistory();
  const user_id = localStorage.getItem("id");

  const onFinish = async (values) => {
    const data = {
      ...values,
      user_id,
    };

    const response = await requestDisbursement(data);
    if (response.data.success) {
      message.success("Berhasil megirimkan permintaan pencairan!");
      history.goBack();
    } else {
      message.error(`Gagal mengirim permintaan: ${response.data.message}`);
    }
  };

  return (
    <CardForm title={`Request Pencairan`}>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        autoComplete={false}
        onFinish={onFinish}
        colon={false}
      >
        <Form.Item
          label="Komisi"
          name="commission_id"
          rules={[
            {
              required: true,
              message: "Mohon masukkan komisi yang akan dicairkan",
            },
          ]}
        >
          <Select options={[{ label: "commisison1", value: 1 }]} />
        </Form.Item>
        <Form.Item
          label="Nominal"
          name="request_nominal"
          rules={[
            {
              required: true,
              message: "Mohon masukkan jumlah nominal yang akan dicairkan",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            addonBefore="Rp"
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 4,
          }}
        >
          <Space size="middle">
            <Button type="primary" danger htmlType="Kirim">
              Simpan
            </Button>
            <Button danger htmlType="button" onClick={() => history.goBack()}>
              Batal
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </CardForm>
  );
}
