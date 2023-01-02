import { UploadOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getArticleDetail, updateArticle } from "../../../../../../api/artikel";
import { getArticleCategories } from "../../../../../../api/artikel/category";
import { asset } from "../../../../../../configs/apiConfig";

import {
  Button,
  Form,
  Space,
  Input,
  Spin,
  Select,
  message,
  Upload,
} from "antd";
import { Trash } from "iconsax-react";

import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import RichEditor from "../../../../../components/custom-components/rich-editor/RichEditor";

const index = (props) => {
  const history = useHistory();
  const { id } = useParams();

  const { data, error, loading } = getArticleDetail(id);
  const articleCategory = getArticleCategories();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [article_category_id, setArticle_category_id] = useState(0);
  const [status, setStatus] = useState(0);
  const [thumbnail, setThumbnail] = useState([]);
  const [thumbnailChanged, setThumbnailChanged] = useState(false);

  useEffect(() => {
    if (data.title) {
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
      setArticle_category_id(data.article_category?.id);
      setThumbnail([
        {
          name: data.thumbnail,
          status: "done",
          url: asset(data?.thumbnail),
        },
      ]);
    }
  }, [data]);

  const thumbnailOnChangeHandler = (i) => {
    if (i.fileList.length === 0) setThumbnail([]);
    else {
      i.file.status = "done";
      const isJpgOrPng =
        i.file.type === "image/jpeg" || i.file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = i.file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      if (!isJpgOrPng || !isLt2M) {
        i.fileList.splice(0, 1);
      } else {
        setThumbnail([i.file.originFileObj]);
        !thumbnailChanged && setThumbnailChanged(true);
      }
    }
  };

  const onFinish = async () => {
    const form = new FormData();

    form.append("title", title);
    form.append("description", description);
    form.append("article_category_id", article_category_id);
    form.append("status", status);
    thumbnailChanged && form.append("thumbnail", thumbnail[0]);
    form.append("_method", "put");

    const response = await updateArticle(form, id);

    if (response?.data?.success) {
      message.success("Berhasil mengubah artikel");
      history.goBack();
    } else {
      message.error(`Gagal memperbarui artikel!: ${response}`);
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  return (
    <>
      <CardForm title={`Ubah Data Artikel ${data.title}`}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          autoComplete="off"
          size="small"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelAlign="left"
          colon={false}
        >
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <Form.Item label="Judul" name="title" initialValue={title}>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={title}
                />
              </Form.Item>

              <Form.Item
                label="Kategori"
                name="article_category_id"
                initialValue={article_category_id}
              >
                {articleCategory.loading ? (
                  <Select loading></Select>
                ) : (
                  <Select
                    defaultValue={article_category_id}
                    value={article_category_id}
                    onChange={(e) => setArticle_category_id(e)}
                  >
                    {articleCategory.data.map((d) => (
                      <Select.Option value={d.id}>{d.name}</Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Status" name="status" initialValue={status}>
                <Select value={status} onChange={(e) => setStatus(e)}>
                  <Select.Option value={1}>Aktif</Select.Option>
                  <Select.Option value={2}>Non-aktif</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Thumbnail" key="thumbnail" name="thumbnail">
                <Upload
                  accept=".jpg,.png,.jpeg,.svg"
                  customRequest={undefined}
                  className="avatar-uploader"
                  listType="picture"
                  maxCount={1}
                  onChange={thumbnailOnChangeHandler}
                  defaultFileList={thumbnail}
                  showUploadList={{
                    showRemoveIcon: true,
                    removeIcon: <Trash onClick={() => setThumbnail([])} />,
                  }}
                >
                  {thumbnail.length < 1 && (
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
