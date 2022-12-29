import { Button, Form, Space } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";

import { getOneDisbursement } from "../../../../../../api/disbursement/getOneDisbursement";
import LoadingSpinner from "../../../../../components/custom-components/LoadingSpinner";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const history = useHistory();
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;
  const { data, error, loading } = getOneDisbursement(id);

  if (error)
    return <ErrorPage message="Gagal mengambil data detail artikel!" />;
  if (loading) return <LoadingSpinner />;

  return (
    <CardForm title={title} back>
      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 14,
        }}
        autoComplete="off"
        size="small"
      >
        <Form.Item
          label="Wedding Organizer"
          name="wedding organizer"
          rules={[
            {
              required: true,
              message: "Mohon masukkan status commission",
            },
          ]}
        >
          <p>{data && data.commission?.wedding_organizer.name}</p>
        </Form.Item>

        <Form.Item
          label="Commission Name"
          name="commission name"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama commission",
            },
          ]}
        >
          <p>{data && data.commission?.name}</p>
        </Form.Item>

        <Form.Item
          label="Commission Status"
          name="commission status"
          rules={[
            {
              required: true,
              message: "Mohon masukkan status commission",
            },
          ]}
        >
          <p>{data && data.status === 1 ? "Unpaid" : "Paid"}</p>
        </Form.Item>

        <Form.Item
          label="Request Date"
          name="request date"
          rules={[
            {
              required: true,
              message: "Mohon masukkan status commission",
            },
          ]}
        >
          <p>{data && data.request_date}</p>
        </Form.Item>

        <Form.Item
          label="Request Nominal"
          name="request nominal"
          rules={[
            {
              required: true,
              message: "Mohon masukkan status commission",
            },
          ]}
        >
          <p>{data && data.request_nominal}</p>
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
