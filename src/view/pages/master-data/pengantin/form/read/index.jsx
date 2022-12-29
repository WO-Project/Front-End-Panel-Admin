import { Button, Form, Space, DatePicker, TimePicker, Input } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { getOneBride } from "../../../../../../api/pengantin/getOneBride";
import LoadingSpinner from "../../../../../components/custom-components/LoadingSpinner";
import ErrorPage from "../../../../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const history = useHistory();
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;
  const { data: bride, loading, error } = getOneBride(id);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message={error} />;

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
        labelAlign="left"
        colon={false}
      >
        <Form.Item
          label="Pengantin Pria"
          name="groom"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama pengantin pria",
            },
          ]}
        >
          <p>{bride && bride.groom}</p>
        </Form.Item>

        <Form.Item
          label="Pengantin Wanita"
          name="bride"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama pengantin wanita",
            },
          ]}
        >
          <p>{bride && bride.bride}</p>
        </Form.Item>

        <Form.Item
          label="Nomor Telp"
          name="phone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <p>{bride && bride.phone}</p>
        </Form.Item>

        <Form.Item
          label="Alamat"
          name="address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <p>{bride && bride.address}</p>
        </Form.Item>

        <Form.Item
          label="Tanggal Pernikahan"
          name="wedding_date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <p>{bride && bride.wedding_date}</p>
        </Form.Item>

        <Form.Item
          label="Waktu Pernikahan"
          name="wedding_time"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <p>{bride && bride.wedding_time}</p>
        </Form.Item>

        <Form.Item
          label="Alamat Pernikahan"
          name="wedding_address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <p>{bride && bride.wedding_address}</p>
        </Form.Item>

        <Form.Item
          label="Tempat Pernikahan"
          name="wedding_place"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <p>{bride && bride.wedding_place}</p>
        </Form.Item>

        <Form.Item
          label="Wedding Organizer"
          name="wedding_organizer"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <p>{bride && bride.wedding_organizer?.name}</p>
        </Form.Item>

        <Form.Item label="Dibuat Oleh" name="creator">
          <p>{bride?.creator}</p>
        </Form.Item>

        <Form.Item label="Dibuat Pada" name="created_at">
          <p>{Date(bride?.created_at)}</p>
        </Form.Item>

        <Form.Item label="Diubah Oleh" name="editor">
          <p>{bride?.editor}</p>
        </Form.Item>

        <Form.Item label="Diubah Pada" name="edited_at">
          <p>{Date(bride?.updated_at)}</p>
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
