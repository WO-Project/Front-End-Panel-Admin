import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { postArticle } from "../../../../../../api/artikel";
import { getArticleCategories } from "../../../../../../api/artikel/category";

import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, message, Select, Upload } from "antd";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import RichEditor from "../../../../../components/custom-components/rich-editor/RichEditor";

const index = () => {
  const history = useHistory();

  const { data, loading, error } = getArticleCategories();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [article_category_id, setArticle_category_id] = useState(1);
  const [thumbnail, setThumbnail] = useState();

  const thumbnailOnChangeHandler = (i) => {
    if (i.fileList.length === 0) setThumbnail("");
    else {
      i.file.status = "done";

      const isJpgOrPng =
        i.file.type === "image/jpeg" || i.file.type === "image/png";

      if (!isJpgOrPng) {
        message.error("File yang diterima berformat JPG/PNG!");
      }

      const isLt2M = i.file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Ukuran maksimal file 2MB!");
      }

      if (!isJpgOrPng || !isLt2M) {
        i.fileList.splice(0, 1);
      } else {
        setThumbnail(i.file.originFileObj);
      }
    }
  };

  const onFinish = async () => {
    const form = new FormData();

    form.append("title", title);
    form.append("description", description);
    form.append("article_category_id", article_category_id);
    form.append("thumbnail", thumbnail);

    const response = await postArticle(form);

    if (response?.data?.success) {
      message.success("Berhasil menambahkan artikel");
      history.goBack();
    } else {
      message.error(`Gagal menambahkan artikel!: ${response}`);
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
    <CardForm title="Tambah data artikel">
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
        colon={false}
        labelAlign="left"
      >
        <Form.Item
          label="Judul"
          key="title"
          name="title"
          rules={[
            {
              required: true,
              message: "Mohon masukkan judul!",
            },
          ]}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Kategori"
          key="article_category_id"
          name="article_category_id"
          rules={[
            {
              required: true,
              message: "Mohon masukkan judul!",
            },
          ]}
        >
          {loading ? (
            <Select loading></Select>
          ) : (
            <Select
              defaultValue={article_category_id}
              value={article_category_id}
              onChange={(e) => setArticle_category_id(e)}
            >
              {data.map((d) => (
                <Select.Option value={d.id}>{d.name}</Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="Thumbnail"
          key="thumbnail"
          name="thumbnail"
          rules={[
            {
              required: true,
              message: "Mohon masukkan thumbnail!",
            },
          ]}
        >
          <Upload
            accept=".jpg,.png,.jpeg,.svg"
            customRequest={undefined}
            className="avatar-uploader"
            listType="picture"
            maxCount={1}
            onChange={thumbnailOnChangeHandler}
          >
            {!thumbnail && (
              <Button icon={<UploadOutlined />}>
                Upload file png atau jpg
              </Button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Deskripsi"
          name="description"
          initialValue={description}
        >
          <RichEditor
            controlledValueDispatcher={setDescription}
            controlledValueState={description}
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
