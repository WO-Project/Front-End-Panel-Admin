import { useState } from "react";
import { useHistory } from "react-router-dom";

import { getWeddingOrganizers } from "../../../../../../api/wedding-organizer/getWeddingOrganizers";
import { createCommision } from "../../../../../../api/komisi";

import { Button, Form, Space, message, Select, Input, InputNumber } from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = () => {
  const history = useHistory();

  const [wo, setWO] = useState();
  const [name, setName] = useState();
  const [type, setType] = useState(1);
  const [nominal, setNominal] = useState();

  const {
    data: wo_data,
    error: wo_err,
    loading: wo_loading,
  } = getWeddingOrganizers();

  console.log(wo_data);

  const onFinish = async () => {
    const success = await createCommision({
      wedding_organizer_id: wo,
      name,
      type,
      nominal,
    });

    if (success?.data?.success) {
      message.success("Berhasil menambahkan komisi");
      history.goBack();
    } else {
      message.error("Gagal menambahkan komisi");
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (errorInfo.errorFields.length == 1) {
      message.error(errorInfo.errorFields[0].errors[0]);
    } else {
      message.error("Mohon isi semua form yang ada");
    }
  };

  if (wo_err) return <ErrorPage message="Gagal Mengambil Data" />;

  return (
    <CardForm title="Tambah Data Kategori Komisi/Group User">
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="left"
        colon={false}
      >
        <Form.Item
          label="WO"
          name="wo"
          rules={[
            {
              required: true,
              message: "Mohon masukkan Wedding Organizer!",
            },
          ]}
        >
          {wo_loading ? (
            <Select loading showSearch placeholder="Pilih WO" />
          ) : wo_data[0] === null || wo_data.length === 0 ? (
            <Select
              disabled
              showSearch
              placeholder="Tambah WO terlebih dahulu!"
            />
          ) : (
            <Select
              showSearch
              placeholder="Pilih WO"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label?.toUpperCase() ?? "").includes(
                  input.toUpperCase()
                )
              }
              options={wo_data?.map((value) => ({
                value: value.id,
                label: value.name,
              }))}
              onChange={(value) => setWO(value)}
              value={wo}
            />
          )}
        </Form.Item>

        <Form.Item
          label="Nama"
          name="name"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama link affiliasi!",
            },
          ]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label={type === 1 ? "Persentase" : "Nominal"}
          key="nominal"
          name="nominal"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nominal diskon!",
            },
            {
              type: "number",
              message: "Mohon masukkan dengan format angka!",
            },
          ]}
        >
          <InputNumber
            value={nominal}
            onChange={(value) => setNominal(value)}
            style={{
              width: "100%",
            }}
            addonBefore={
              <Select
                onChange={(value) => setType(value)}
                value={type}
                style={{ width: 60 }}
                defaultValue={1}
              >
                <Select.Option value={1}>%</Select.Option>
                <Select.Option value={2}>Rp</Select.Option>
              </Select>
            }
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 4,
          }}
        >
          <Space size="middle">
            <Button type="primary" danger htmlType="submit">
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
};

export default index;
