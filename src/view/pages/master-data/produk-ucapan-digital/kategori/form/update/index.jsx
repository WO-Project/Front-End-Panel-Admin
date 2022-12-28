import { Button, Form, Space, Input, InputNumber, Select, message } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../../components/custom-components/form-crud/CardForm";
import { getOneProductCategory } from "../../../../../../../api/produk/product-categories/getOneProductCategory";
import { putProductCategory } from "../../../../../../../api/produk/product-categories/putProductCategory";

const index = (props) => {
  const history = useHistory();
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;

  const { data: category } = getOneProductCategory(id);

  const onFinish = async (values) => {
    const success = await putProductCategory(values, id);

    if (success == true) {
      message.success("Berhasil mengubah produk");
      history.push("/admin/kategori-produk-ucapan-digital");
    } else {
      message.error("Gagal mengubah produk");
    }
  };

  return (
    <CardForm title={title}>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        autoComplete="off"
        onFinish={onFinish}
        labelAlign="left"
        colon={false}
        fields={[
          {
            name: "name",
            value: category?.name,
          },
          {
            name: "description",
            value: category?.description,
          },
          {
            name: "status",
            value: category?.status,
          },
        ]}
      >
        <Form.Item label="Nama Produk" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Deskripsi Produk" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Kategori Produk" name="status">
          <Select
            style={{
              width: 200,
            }}
          >
            <Select.Option value={1}>Aktif</Select.Option>
            <Select.Option value={0}>Non-Aktif</Select.Option>
          </Select>
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
