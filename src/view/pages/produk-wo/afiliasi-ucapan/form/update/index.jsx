import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getWeddingOrganizers } from "../../../../../../api/wedding-organizer/getWeddingOrganizers";
import {
  createAffiliates,
  detailAffiliates,
  updateAffiliates,
} from "../../../../../../api/afiliasi";

import { Button, Form, Space, message, Select, Input, Spin } from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";
import { useEffect } from "react";

const index = () => {
  const history = useHistory();
  const { id } = useParams();

  const [wo, setWO] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();

  const {
    data: wo_data,
    error: wo_err,
    loading: wo_loading,
  } = getWeddingOrganizers();

  const {
    data: affiliates_detail_data,
    err: affiliates_detail_error,
    loading: affiliates_detail_loding,
  } = detailAffiliates(id);

  useEffect(() => {
    if (affiliates_detail_data?.wedding_organizer_id) {
      setWO(affiliates_detail_data.wedding_organizer_id);
      setName(affiliates_detail_data.name);
      setDescription(affiliates_detail_data.description);
      setStatus(affiliates_detail_data.status);
    }
  }, [affiliates_detail_data]);

  const onFinish = async () => {
    const success = await updateAffiliates(id, {
      wedding_organizer_id: wo,
      name,
      description,
      status,
    });

    if (success?.data?.success) {
      message.success("Berhasil menambahkan link affiliasi");
      history.goBack();
    } else {
      message.error("Gagal menambahkan link affiliasi");
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  if (wo_err || affiliates_detail_error)
    return <ErrorPage message="Gagal Mengambil Data" />;

  if (affiliates_detail_loding) return <Spin />;

  return (
    <CardForm title={`Edit Link Afiliasi ${affiliates_detail_data?.name}`}>
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
          label="Deskripsi"
          name="description"
          rules={[
            {
              required: true,
              message: "Mohon masukkan deskripsi link affiliasi!",
            },
          ]}
          initialValue={description}
        >
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Mohon masukkan status link affiliasi!",
            },
          ]}
          initialValue={status}
        >
          <Select value={status} onChange={(value) => setStatus(value)}>
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
