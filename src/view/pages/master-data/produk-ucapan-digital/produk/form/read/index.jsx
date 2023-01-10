import { Button, Form, Space } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../../components/custom-components/form-crud/CardForm";
import { getOneProduct } from "../../../../../../../api/produk/getOneProduct";
import { asset } from "../../../../../../../configs/apiConfig";
import LoadingSpinner from "../../../../../../components/custom-components/LoadingSpinner";
import ErrorPage from "../../../../../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const history = useHistory();
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;

  const { data: product, loading, error } = getOneProduct(id);

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
        <Form.Item label="Nama Produk" name="name">
          <p>{product?.name}</p>
        </Form.Item>

        <Form.Item label="Kategori Produk" name="product_category_id">
          <p>{product?.product_category?.name}</p>
        </Form.Item>

        <Form.Item label="Harga Produk" name="price">
          <p>{parseInt(product?.price).toLocaleString("en-US")}</p>
        </Form.Item>

        <Form.Item label="Deskripsi Produk" name="description">
          <p>{product?.description}</p>
        </Form.Item>

        {product?.attachment ? (
          <Form.Item label="Video Demo" name="attachment">
            <div style={{ display: "flex" }}>
              <video
                src={asset(product?.attachment)}
                type="video/mp4"
                style={{
                  width: 450,
                  height: 250,
                  objectFit: "contain",
                  objectPosition: "center top",
                }}
                controls
              />
            </div>
          </Form.Item>
        ) : undefined}

        <Form.Item label="Dibuat Oleh" name="creator">
          <p>{product?.creator}</p>
        </Form.Item>

        <Form.Item label="Dibuat Pada" name="created_at">
          <p>{Date(product?.created_at)}</p>
        </Form.Item>

        <Form.Item label="Diubah Oleh" name="editor">
          <p>{product?.editor}</p>
        </Form.Item>

        <Form.Item label="Diubah Pada" name="edited_at">
          <p>{Date(product?.updated_at)}</p>
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
