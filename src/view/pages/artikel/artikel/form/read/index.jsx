import { useHistory, useParams } from "react-router-dom";

import { getArticleDetail } from "../../../../../../api/artikel";
import { asset } from "../../../../../../configs/apiConfig";

import { Button, Form, Space } from "antd";

import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import RichTextReader from "../../../../../components/custom-components/rich-editor/RichTextReader";

const index = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { data, error } = getArticleDetail(id);

  return (
    <CardForm title={`Detail Data Artikel ${data?.title}`}>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{ span: 14 }}
        autoComplete="off"
        size="small"
        labelAlign="left"
        colon={false}
      >
        <Form.Item label="Judul" name="title">
          <p>{data?.title}</p>
        </Form.Item>

        <Form.Item label="Deskripsi" name="description">
          <div style={{ display: "flex", marginBottom: 2 }}>
            <RichTextReader
              value={data?.description}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </Form.Item>

        <Form.Item label="Kategori" name="article_category">
          <p>
            {data?.article_category ? data?.article_category?.name : "not-set"}
          </p>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <p>{data?.status === 1 ? "Aktif" : "Non-aktif"}</p>
        </Form.Item>

        <Form.Item label="Pembuat" name="creator">
          <p>{data?.creator}</p>
        </Form.Item>

        <Form.Item label="Editor" name="editor">
          <p>{data?.editor}</p>
        </Form.Item>

        <Form.Item label="Image" name="thumbnail">
          <div style={{ display: "flex" }}>
            <img
              src={asset(data?.thumbnail)}
              alt="thumbnail"
              style={{ width: 250, height: 200, objectFit: "contain" }}
            />
          </div>
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
