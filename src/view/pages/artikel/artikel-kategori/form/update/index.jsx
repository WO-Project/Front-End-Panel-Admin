import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  updateArticleCategory,
  getArticleCategoryDetail,
} from "../../../../../../api/artikel/category";

import { Button, Form, Space, Input, Spin, Select, message } from "antd";

import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const history = useHistory();
  const { id } = useParams();

  const { data, error, loading } = getArticleCategoryDetail(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (data.name) {
      setName(data.name);
      setDescription(data.description);
      setStatus(data.status);
    }
  }, [data]);

  const onFinish = async () => {
    const success = await updateArticleCategory(
      { name, description, status },
      id
    );

    if (success?.data?.success) {
      message.success("Berhasil mengubah kategori artikel");
      history.goBack();
    } else {
      message.error("Gagal mengubah kategori artikel");
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  if (error) return <ErrorPage message="Gagal Mengambil Data" />;

  return (
    <>
      <CardForm title={`Ubah Data Kategori Artikel ${data.name}`}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelAlign="left"
          colon={false}
        >
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <Form.Item
                label="Nama"
                name="name"
                initialValue={name}
                rules={[
                  {
                    required: true,
                    message: "Mohon masukkan judul!",
                  },
                ]}
              >
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={name}
                />
              </Form.Item>

              <Form.Item
                label="Deskripsi"
                name="description"
                initialValue={description}
                rules={[
                  {
                    required: true,
                    message: "Mohon masukkan deskripsi artikel!",
                  },
                ]}
              >
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  defaultValue={description}
                />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Mohon masukkan status!",
                  },
                ]}
                initialValue={status}
              >
                <Select value={status} onChange={(value) => setStatus(value)}>
                  <Select.Option value={1}>Aktif</Select.Option>
                  <Select.Option value={2}>Non-Aktif</Select.Option>
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
                  <Button
                    danger
                    htmlType="button"
                    onClick={() => history.goBack()}
                  >
                    Batal
                  </Button>
                </Space>
              </Form.Item>
            </>
          )}
        </Form>
      </CardForm>
    </>
  );
};

export default index;
