import { Button, Form, Input, Select, Space, message, InputNumber } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';
import { putWeddingOrganizer } from '../../../../../../api/wedding-organizer/putWeddingOrganizer';
import { getOneWeddingOrganizer } from '../../../../../../api/wedding-organizer/getOneWeddingOrganizer';
import NumericInput from '../../../../../components/custom-components/InputNumberOnly';

const index = (props) => {
  const history = useHistory()
  const title = `${props.location.state.permission} Data ${props.location.state.data}`
  const id = props.location.state.id

  const { data: wo } = getOneWeddingOrganizer(id)

  const onFinish = async (values) => {
    const success = await putWeddingOrganizer(values, id)

    if (success?.data?.success) {
      message.success('Berhasil mengubah data WO')
      history.goBack()
    }
    else {
      message.error('Gagal mengubah data WO')
    }
  };

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
        onFinish={onFinish}
        autoComplete="off"
        colon={false}
        labelAlign="left"
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
          rules={[
            {
              required: true,
              message: "Masukkan nama wo dengan benar!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email WO"
          name="email"
          rules={[
            {
              type: "email",
              message: "Masukkan format email dengan benar!"
            },
            {
              required: true,
              message: "Masukkan email dari wo!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Website WO"
          name="website"
          rules={[
            {
              required: true,
              message: "Masukkan website wo dengan benar!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nomor telp WO"
          name="phone"
          rules={[
            {
              required: true,
              message: "Masukkan nomor telepon wo dengan benar!"
            }
          ]}
        >
          <NumericInput />
        </Form.Item>

        <Form.Item
          label="Alamat WO"
          name="address"
          rules={[
            {
              required: true,
              message: "Masukkan alamat wo dengan benar!"
            }
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Status WO"
          name="status"
          rules={[
            {
              required: true,
              message: "Masukkan status wo dengan benar!"
            }
          ]}
        >
          <Select style={{ width: "200px" }}>
            <Option value={1}>Aktif</Option>
            <Option value={2}>Non Aktif</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
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