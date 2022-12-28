import { Button, Form, Input, InputNumber, Space, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import React from "react";

import CardForm from "../../../../../../components/custom-components/form-crud/CardForm";
import { postProduct } from "../../../../../../../api/produk/postProduct";
import { getProductCategories2 } from "../../../../../../../api/produk/product-categories/getProductCategories2";
import InputPrice from "../../../../../../components/custom-components/InputPrice";

const index = () => {
  const history = useHistory();
  const { data: categories } = getProductCategories2();
  const [video, setVideo] = useState(false)

  const onFinish = async (values) => {
    if (values?.file?.size > 1000000 * 20) { // 20 Mb
      message.error("File harus lebih kecil dari 20 MB")
      return
    }

    const form = new FormData()

    form.append("name", values.name)
    form.append("price", values.price.replace(",", ""))
    form.append("description", values.description)
    form.append("product_category_id", values.product_category_id)
    form.append("attachment", values.attachment.file.originFileObj)

    const success = await postProduct(form);
    if (success) {
      message.success("Berhasil menambahkan produk");
      history.push("/admin/produk-ucapan-digital");
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

  const handleSelectFile = (e) => {
    if (e.fileList.length == 0)
      setVideo(false)
    else if ((e.fileList.length == 1))
      setVideo(true)
  }

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
          label="Nama Produk"
          name="name"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama produk",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori Produk"
          name="product_category_id"
          rules={[
            {
              required: true,
              message: "Mohon pilih kategori produk",
            },
          ]}
        >
          <Select
            style={{
              width: 200,
            }}
          >
            {categories?.map((category) => (
              <Select.Option value={category?.id}>
                {category?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Harga Produk"
          name="price"
          rules={[
            {
              required: true,
              message: "Mohon tentukan harga produk",
            },
          ]}
        >
          <InputPrice />
        </Form.Item>

        <Form.Item
          label="Deskripsi Produk"
          name="description"
          rules={[
            {
              required: true,
              message: "Mohon tentukan deskripsi produk",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Upload Video Demo"
          name="attachment"
          rules={[
            {
              required: true,
              message: "Mohon masukkan demo video produk",
            },
          ]}
        >
          <Upload
            accept=".mp4,.mkv,.mov,.webm"
            customRequest={undefined}
            maxCount={1}
            onChange={handleSelectFile}
            className="avatar-uploader"
            listType="picture"
          >
            {!video && (
              <Button icon={<UploadOutlined />}>
                Upload video demo
              </Button>
            )}
          </Upload>
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
              onClick={() => history.push("/admin/produk-ucapan-digital")}
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
