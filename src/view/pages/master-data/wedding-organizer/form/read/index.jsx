import { Button, Form, Space } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { getOneWeddingOrganizer } from "../../../../../../api/wedding-organizer/getOneWeddingOrganizer";
import LoadingSpinner from "../../../../../components/custom-components/LoadingSpinner";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const history = useHistory();
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;

  const { data: wo, loading, error } = getOneWeddingOrganizer(id);

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
        colon={false}
        labelAlign="left"
      >
        <Form.Item label="Nama WO" name="name">
          <p>{wo?.name}</p>
        </Form.Item>

        <Form.Item
          label="Email WO"
          name="email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <p>{wo?.email}</p>
        </Form.Item>

        <Form.Item label="Nomor telp WO" name="phone">
          <p>{wo?.phone}</p>
        </Form.Item>

        <Form.Item label="Website WO" name="website">
          <p>{wo?.website}</p>
        </Form.Item>

        <Form.Item label="Alamat WO" name="address">
          <p>{wo?.address}</p>
        </Form.Item>

        <Form.Item label="Status WO" name="status">
          <p>{wo?.status == 1 ? "Aktif" : "Non Aktif"}</p>
        </Form.Item>

        <Form.Item label="Dibuat Oleh" name="creator">
          <p>{wo?.creator}</p>
        </Form.Item>

        <Form.Item label="Dibuat Pada" name="created_at">
          <p>{Date(wo?.created_at)}</p>
        </Form.Item>

        <Form.Item label="Diubah Oleh" name="editor">
          <p>{wo?.editor}</p>
        </Form.Item>

        <Form.Item label="Diubah Pada" name="edited_at">
          <p>{Date(wo?.updated_at)}</p>
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
