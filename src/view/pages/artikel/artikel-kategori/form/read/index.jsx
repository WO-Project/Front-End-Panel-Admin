import { useHistory, useParams } from "react-router-dom";

import { getArticleCategoryDetail } from "../../../../../../api/artikel/category";

import { Button, Form, Space, Spin } from "antd";
import { Back } from "iconsax-react";

import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";
import LoadingSpinner from "../../../../../components/custom-components/LoadingSpinner";

const index = (props) => {
  const { id } = useParams();
  const { data, error, loading } = getArticleCategoryDetail(id);

  if (error)
    return <ErrorPage message="Gagal mengambil data detail artikel!" />;
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <CardForm title={`Detail Data Kategori Artikel ${data.name}`} back>
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

          <Form.Item label="Dibuat Oleh" name="creator">
            <p>{data.creator}</p>
          </Form.Item>

          <Form.Item label="Dibuat Pada" name="created_at">
            <p>{Date(data.created_at)}</p>
          </Form.Item>

          <Form.Item label="Diubah Oleh" name="editor">
            <p>{data.editor}</p>
          </Form.Item>

          <Form.Item label="Diubah Pada" name="edited_at">
            <p>{Date(data.updated_at)}</p>
          </Form.Item>

          <Form.Item></Form.Item>
        </Form>
      </CardForm>
    </div>
  );
};

export default index;
