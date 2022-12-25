import { useState } from "react";
import { useHistory } from "react-router-dom";

import { getWeddingOrganizers } from "../../../../../../api/wedding-organizer/getWeddingOrganizers";
import { createAffiliates } from "../../../../../../api/afiliasi";

import { Button, Form, Space, message, Select, Input } from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = () => {
  const history = useHistory();

  const [wo, setWO] = useState(null);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [link, setLink] = useState();

  const {
    data: wo_data,
    error: wo_err,
    loading: wo_loading,
  } = getWeddingOrganizers();

  const onFinish = async () => {
    const success = await createAffiliates({
      wedding_organizer_id: wo,
      name,
      description,
      link,
    });

    if (success?.data?.success) {
      message.success("Berhasil menambahkan link affiliasi");
      history.goBack();
    } else {
      message.error("Gagal menambahkan link affiliasi");
    }
  };

  console.log(wo_loading);

  const onFinishFailed = (errorInfo) => {
    if (errorInfo.errorFields.length == 1) {
      message.error(errorInfo.errorFields[0].errors[0]);
    } else {
      message.error("Mohon isi semua form yang ada");
    }
  };

  if (wo_err) return <ErrorPage message="Gagal Mengambil Data" />;

  return (
    <CardForm title="Tambah Link Afiliasi">
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
              showSearch
              placeholder="Tambah WO terlebih dahulu!"
              disabled
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
              options={
                wo_data[0] != null
                  ? wo_data.map((v) => ({
                      value: v.id,
                      label: v.name,
                    }))
                  : []
              }
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
          label="Deskripsi"
          name="description"
          rules={[
            {
              required: true,
              message: "Mohon masukkan deskripsi link affiliasi!",
            },
          ]}
        >
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Link"
          name="link"
          rules={[
            {
              required: true,
              message: "Mohon masukkan dlink affiliasi!",
            },
          ]}
        >
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
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
