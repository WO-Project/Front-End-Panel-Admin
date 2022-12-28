import { Button, Form, Space, Input, InputNumber, Select, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import CardForm from "../../../../../../components/custom-components/form-crud/CardForm";
import { getOneProduct } from "../../../../../../../api/produk/getOneProduct";
import { getProductCategories2 } from "../../../../../../../api/produk/product-categories/getProductCategories2";
import { putProduct } from "../../../../../../../api/produk/putProduct";
import InputPrice from "../../../../../../components/custom-components/InputPrice";

const index = (props) => {
  const history = useHistory();
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;
  const [video, setVideo] = useState(false)

  const { data: product } = getOneProduct(id);
  const { data: categories } = getProductCategories2();

  const onFinish = async (values) => {
    if (values?.file?.size > 1000000 * 20) { // 20 Mb
      message.error("File harus lebih kecil dari 20 MB")
      return
    }
    console.log(values);

    const form = new FormData()
    form.append("name", values.name)
    form.append("price", values.price.replace(",", ""))
    form.append("description", values.description)
    form.append("product_category_id", values.product_category_id)
    form.append("status", values.status)
    form.append("attachment", values.attachment.file.originFileObj)

    const success = await putProduct(form, id);

    if (success == true) {
      message.success("Berhasil mengubah produk");
      history.push("/admin/produk-ucapan-digital");
    } else {
      message.error("Gagal mengubah produk");
    }
  };

  const handleSelectFile = (e) => {
    if (e.fileList.length == 0)
      setVideo(false)
    else if ((e.fileList.length == 1))
      setVideo(true)
  }

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
            value: product?.name,
          },
          {
            name: "product_category_id",
            value: product?.product_category?.id,
          },
          {
            name: "price",
            value: Number(product?.price).toLocaleString("en-US"),
          },
          {
            name: "description",
            value: product?.description,
          },
          {
            name: "status",
            value: product?.status,
          },
        ]}
      >
        <Form.Item label="Nama Produk" name="name"
          rules={[
            {
              required: true,
              message: "Masukkan nama produk dengan benar!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Kategori Produk" name="product_category_id"
          rules={[
            {
              required: true,
              message: "Pilih kategori produk dengan benar!"
            }
          ]}
        >
          <Select
            style={{
              width: 200,
            }}
          >
            {categories?.map((category) => (
              <Select.Option value={category?.id} key={category?.id}>
                {category?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Harga Produk" name="price"
          rules={[
            {
              required: true,
              message: "Masukkan harga produk dengan benar!"
            }
          ]}
        >
          <InputPrice />
        </Form.Item>

        <Form.Item label="Deskripsi Produk" name="description"
          rules={[
            {
              required: true,
              message: "Masukkan deskripsi produk dengan benar!"
            }
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
              message: "Upload video demo produk!"
            }
          ]}
        >
          <Upload
            accept=".mp4,.mkv,.mov,.webm"
            customRequest={undefined}
            maxCount={1}
            onChange={handleSelectFile}
            className="avatar-uploader"
            name="attachment"
          >
            {!video && (
              <Button icon={<UploadOutlined />}>
                Upload video demo
              </Button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="Status" name="status"
          rules={[
            {
              required: true,
              message: "Masukkan status dengan benar!"
            }
          ]}>
          <Select style={{ width: "200px" }}>
            <Option value={1}>Aktif</Option>
            <Option value={2}>Non-Aktif</Option>
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
              onClick={() => history.push("/admin/produk-ucapan-digital")}
            >
              Batal
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </CardForm >
  );
};

export default index;
