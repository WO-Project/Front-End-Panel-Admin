import { Button, Form, Space } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../../components/custom-components/form-crud/CardForm";
import { getOneProductCategory } from "../../../../../../../api/produk/product-categories/getOneProductCategory";
import LoadingSpinner from "../../../../../../components/custom-components/LoadingSpinner";
import ErrorPage from "../../../../../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const history = useHistory();
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;

  const { data, loading, error } = getOneProductCategory(id);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message={error} />;

  return (
    <CardForm title={title} back>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        autoComplete="off"
        labelAlign="left"
        colon={false}
      >
        <Form.Item label="Nama Kategori" name="name">
          <p>{data?.name}</p>
        </Form.Item>

        <Form.Item label="Deskripsi" name="description">
          <p>{data?.description}</p>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <p>{data?.status == 1 ? "Aktif" : "Non-Aktif"}</p>
        </Form.Item>

        <Form.Item label="Dibuat Oleh" name="creator">
          <p>{data?.creator}</p>
        </Form.Item>

        <Form.Item label="Dibuat Pada" name="created_at">
          <p>{Date(data?.created_at)}</p>
        </Form.Item>

        <Form.Item label="Diubah Oleh" name="editor">
          <p>{data?.editor}</p>
        </Form.Item>

        <Form.Item label="Diubah Pada" name="edited_at">
          <p>{Date(data?.updated_at)}</p>
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
