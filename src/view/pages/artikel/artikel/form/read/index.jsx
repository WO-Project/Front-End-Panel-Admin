import { useHistory, useParams } from "react-router-dom";

import { getArticleDetail } from "../../../../../../api/artikel";

import { Button, Form, Space } from "antd";

import CardForm from "../../../../../components/custom-components/form-crud/CardForm";

const index = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { data, error } = getArticleDetail(id);

  return (
    <CardForm title={`Detail Data Artikel ${data.title}`}>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        autoComplete="off"
        size="small"
      >
        <Form.Item label="Judul" name="title">
          <p>{data.title}</p>
        </Form.Item>

        <Form.Item label="Deskripsi" name="description">
          <p>{data.description}</p>
        </Form.Item>

        <Form.Item label="Kategori" name="article_category">
          {data.article_category ? <p>{data.article_category.name}</p> : ""}
        </Form.Item>

        <Form.Item label="Status" name="status">
          <p>{data.status}</p>
        </Form.Item>

        <Form.Item label="Pembuat" name="creator">
          <p>{data.creator}</p>
        </Form.Item>

        <Form.Item label="Editor" name="editor">
          <p>{data.editor}</p>
        </Form.Item>

        <Form.Item label="Image" name="thumbnail">
          <img
            src={`http://127.0.0.1:8000/uploads/${data.thumbnail}`}
            alt="thumbnail"
            style={{ width: 250, height: 200, objectFit: "contain" }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 4,
          }}
        >
          <Space size="middle">
            <Button danger htmlType="button" onClick={() => history.goBack()}>
              Kembali
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
