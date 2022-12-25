import { Button, Form, Input, Space, message } from "antd";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { postCustomer } from "../../../../../../api/customer/postCustomer";
import { postArticleCategory } from "../../../../../../api/artikel/category/postCategory";

const index = () => {
  const history = useHistory();

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const onFinish = async () => {
    const success = await postArticleCategory({ name, description });
    if (success.data.success) {
      message.success("Berhasil menambahkan kategori artikel");
      history.goBack();
    } else {
      message.error("Gagal menambahkan kategori artikel");
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (errorInfo.errorFields.length == 1) {
      message.error(errorInfo.errorFields[0].errors[0]);
    } else {
      message.error("Mohon isi semua form yang ada");
    }
  };

  return (
    <CardForm title="Tambah data kategori artikel">
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
          label="Nama"
          name="name"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama!",
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
              message: "Mohon masukkan deskripsi!",
            },
          ]}
        >
          <Input.TextArea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
