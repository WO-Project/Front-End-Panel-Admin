import { Button, Form, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';
import { getOneWeddingOrganizer } from '../../../../../../api/wedding-organizer/getOneWeddingOrganizer';

const index = (props) => {
  const history = useHistory()
  const title = `${props.location.state.permission} Data ${props.location.state.data}`
  const id = props.location.state.id

  const { data: wo } = getOneWeddingOrganizer(id)

  return (
    <CardForm title={title}>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        autoComplete="off"
      >

        <Form.Item
          label="Nama WO"
          name="name"
        >
          <p>{wo?.name}</p>
        </Form.Item>

        <Form.Item
          label="Email WO"
          name="email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <p>{wo?.email}</p>
        </Form.Item>

        <Form.Item
          label="Nomor telp WO"
          name="phone"
        >
          <p>{wo?.phone}</p>
        </Form.Item>

        <Form.Item
          label="Website WO"
          name="website"
        >
          <p>{wo?.website}</p>
        </Form.Item>

        <Form.Item
          label="Alamat WO"
          name="address"
        >
          <p>{wo?.address}</p>
        </Form.Item>

        <Form.Item
          label="Status WO"
          name="status"
        >
          <p>{wo?.status}</p>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 4,
          }}
        >
          <Space size='middle'>
            <Button danger htmlType="button" onClick={() => history.goBack()}>
              Batal
            </Button>
          </Space>
        </Form.Item>

      </Form>
    </CardForm>
  );
};


export default index