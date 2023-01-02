import { Button, Form, Space } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { getOneCustomer } from "../../../../../../api/customer/getOneCustomer";
import LoadingSpinner from "../../../../../components/custom-components/LoadingSpinner";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const history = useHistory();
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;

  const { data: customer, error, loading } = getOneCustomer(id);

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
        <Form.Item label="Nama" name="nama">
          <p>{customer?.name}</p>
        </Form.Item>

        <Form.Item label="Email" name="email">
          <p>{customer?.email}</p>
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <p>{customer?.phone}</p>
        </Form.Item>

        <Form.Item label="Address" name="address">
          <p>{customer?.address}</p>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <p>
            {customer?.status == 1
              ? "Aktif"
              : customer?.status == 2
              ? "Non Aktif"
              : undefined}
          </p>
        </Form.Item>

        <Form.Item label="Dibuat Oleh" name="creator">
          <p>{customer?.creator}</p>
        </Form.Item>

        <Form.Item label="Dibuat Pada" name="created_at">
          <p>{Date(customer?.created_at)}</p>
        </Form.Item>

        <Form.Item label="Diubah Oleh" name="editor">
          <p>{customer?.editor}</p>
        </Form.Item>

        <Form.Item label="Diubah Pada" name="edited_at">
          <p>{Date(customer?.updated_at)}</p>
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
