import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getWeddingOrganizers } from "../../../../../../api/wedding-organizer/getWeddingOrganizers";
import {
  updateCommision,
  useCommisionDetail,
} from "../../../../../../api/komisi";

import {
  Button,
  Form,
  Space,
  message,
  Select,
  Input,
  InputNumber,
  Spin,
} from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";
import { useEffect } from "react";

const index = () => {
  const history = useHistory();
  const { id } = useParams();

  const [wo, setWO] = useState();
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [nominal, setNominal] = useState();
  const [status, setStatus] = useState();

  const {
    data: wo_data,
    error: wo_err,
    loading: wo_loading,
  } = getWeddingOrganizers();

  const {
    data: commision_detail_data,
    err: commision_detail_error,
    loading: commision_detail_loading,
  } = useCommisionDetail(id);

  useEffect(() => {
    setWO(commision_detail_data?.wedding_organizer_id);
    setName(commision_detail_data?.name);
    setType(commision_detail_data?.type);
    setNominal(commision_detail_data?.nominal);
    setStatus(commision_detail_data?.status);
  }, [commision_detail_data]);

  const onFinish = async () => {
    const success = await updateCommision(id, {
      wedding_organizer_id: wo,
      name,
      type,
      nominal,
      status,
    });

    if (success?.data?.success) {
      message.success("Berhasil menambahkan komisi");
      history.goBack();
    } else {
      message.error("Gagal menambahkan komisi");
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  if (wo_err || commision_detail_error)
    return <ErrorPage message="Gagal Mengambil Data" />;

  if (commision_detail_loading) return <Spin />;

  return (
    <CardForm
      title={`Edit Data Kategori Komisi ${commision_detail_data?.name}`}
    >
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
          initialValue={wo}
        >
          {wo_loading ? (
            <Select loading showSearch placeholder="Pilih WO" />
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
          initialValue={name}
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
              message: "Mohon masukkan nominal komisi!",
            },
            {
              type: "number",
              message: "Mohon masukkan dengan format angka!",
            },
          ]}
          initialValue={nominal}
        >
          <InputNumber
            max={type === 1 ? 100 : undefined}
            min={0}
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
                defaultValue={type}
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
          label="Status"
          key="status"
          name="status"
          rules={[
            {
              required: true,
              message: "Mohon masukkan status komisi!",
            },
          ]}
          initialValue={status}
        >
          <Select onChange={(value) => setStatus(value)} value={status}>
            <Select.Option value={1}>Aktif</Select.Option>
            <Select.Option value={2}>Non-aktif</Select.Option>
          </Select>
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
