import { Button, Form, Input, InputNumber, Space, message, Select } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../../components/custom-components/form-crud/CardForm";
import { postProductCategory } from "../../../../../../../api/produk/product-categories/postProductCategory";

const index = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    const success = await postProductCategory(values);

    if (success) {
      message.success("Berhasil menambahkan produk");
      history.push("/admin/kategori-produk-ucapan-digital");
    } else {
      message.error("Gagal menambahkan produk");
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (errorInfo.errorFields.length == 1) {
      message.error(errorInfo.errorFields[0].errors[0])
    }
    else {
      message.error("Mohon isi semua form yang ada")
    }
  };

  return (
    <CardForm title="Tambah data produk ucapan digital">
      <Form
        name="basic"
        labelCol={{
          span: 6,
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
          label="Nama Kategori"
          name="name"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama kategori produk",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Deskripsi"
          name="description"
          rules={[
            {
              required: true,
              message: "Mohon tentukan deskripsi kategori produk",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
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
              onClick={() =>
                history.push("/admin/kategori-produk-ucapan-digital")
              }
            >
              Batal
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
