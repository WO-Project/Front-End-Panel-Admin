import { Button, Form, Input, InputNumber, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';

const index = (props) => {
  const history = useHistory()
  const title = `${props.location.state.permission} Data ${props.location.state.data}`
  const id = props.location.state.id

  const { data: wo } = getOneWeddingOrganizer(id)

  const onFinish = (values) => {
    alert('Success:', values);
  };

  return (
    <CardForm title={title}>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
        autoComplete="off"
        fields={[
          {
            name: 'name',
            value: wo?.name
          },
          {
            name: 'email',
            value: wo?.email
          },
          {
            name: 'phone',
            value: wo?.phone
          },
          {
            name: 'website',
            value: wo?.website
          },
          {
            name: 'address',
            value: wo?.address
          },
          {
            name: 'status',
            value: wo?.status
          },
        ]}
      >
        <Form.Item
          label="Nama WO"
          name="name"
        >
          <Input />
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Website WO"
          name="website"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nomor telp WO"
          name="phone"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Alamat WO"
          name="address"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status WO"
          name="status"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 4,
          }}
        >
          <Space size='middle'>
            <Button type='primary' danger htmlType="submit">
              Simpan
            </Button>
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