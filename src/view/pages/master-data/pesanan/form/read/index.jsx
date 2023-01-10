import { Button, Form, Space } from "antd";
import React from "react";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";

import { getPesanan } from "../../../../../../api/pesanan/getPesanan";
import LoadingSpinner from "../../../../../components/custom-components/LoadingSpinner";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;
  const { data, error, loading } = getPesanan(id);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message={error} />;

  return (
    <CardForm title={title} back>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        autoComplete="off"
        size="small"
        colon={false}
        labelAlign="left"
      >
        <Form.Item label="Voucher Code" name="voucher code">
          <p>{data && data.sales_order?.code}</p>
        </Form.Item>

        <Form.Item label="Voucher Nominal" name="voucher nominal">
          <p>{data && data.sales_order?.voucher_nominal}</p>
        </Form.Item>

        <Form.Item label="Bride" name="bride">
          <p>{data && data.sales_order?.bride.bride}</p>
        </Form.Item>

        <Form.Item label="Groom" name="groom">
          <p>{data && data.sales_order?.bride.groom}</p>
        </Form.Item>

        <Form.Item label="WO Name" name="wo name">
          <p>{data && data.sales_order?.bride.wedding_organizer.name}</p>
        </Form.Item>

        <Form.Item label="WO Email" name="wo email">
          <p>{data && data.sales_order?.bride.wedding_organizer.email}</p>
        </Form.Item>

        <Form.Item label="WO Website" name="wo website">
          <p>{data && data.sales_order?.bride.wedding_organizer.website}</p>
        </Form.Item>

        <Form.Item label="WO Address" name="wo address">
          <p>{data && data.sales_order?.bride.wedding_organizer.address}</p>
        </Form.Item>

        <Form.Item label="Product Name" name="product name">
          <p>{data && data.product?.name}</p>
        </Form.Item>

        <Form.Item label="Product Price" name="product price">
          <p>{data && data.product?.price}</p>
        </Form.Item>

        <Form.Item label="Deskripsi Produk" name="product deskripsi">
          <p>{data && data.product?.description}</p>
        </Form.Item>

        <Form.Item label="Product Status" name="product status">
          <p>{data?.product?.status == 1 ? "Aktif" : "Nonaktif"}</p>
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
