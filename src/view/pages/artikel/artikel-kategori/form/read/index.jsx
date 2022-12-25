import { useHistory, useParams } from "react-router-dom";

import { getArticleCategoryDetail } from "../../../../../../api/artikel/category";

import { Button, Form, Space } from "antd";

import CardForm from "../../../../../components/custom-components/form-crud/CardForm";

const index = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { data, error } = getArticleCategoryDetail(id);

  return (
    <>
      <CardForm title={`Detail Data Kategori Artikel ${data.name}`}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          autoComplete="off"
          size="small"
          labelAlign="left"
          colon={false}
        >
          <Form.Item label="ID Artikel" name="id">
            <p>{data.id}</p>
          </Form.Item>

          <Form.Item label="Nama" name="name">
            <p>{data.name}</p>
          </Form.Item>

          <Form.Item label="Slug" name="slug">
            <p>{data.slug}</p>
          </Form.Item>

          <Form.Item label="Deskripsi" name="description">
            <p>{data.description}</p>
          </Form.Item>

          <Form.Item label="Status" name="status">
            <p>{data.status}</p>
          </Form.Item>

          <Form.Item label="Pembuat" name="creator">
            <p>{data.creator}</p>
          </Form.Item>

          <Form.Item label="Dibuat Pada" name="created_at">
            <p>{data.created_at}</p>
          </Form.Item>

          <Form.Item label="Editor" name="editor">
            <p>{data.editor}</p>
          </Form.Item>

          <Form.Item label="Diubah Pada" name="edited_at">
            <p>{data.updated_at}</p>
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
    </>
  );
};

export default index;
