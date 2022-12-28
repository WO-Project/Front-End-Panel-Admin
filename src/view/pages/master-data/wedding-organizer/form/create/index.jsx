import { Button, Form, Input, Space, message, InputNumber } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';
import { postWeddingOrganizer } from '../../../../../../api/wedding-organizer/postWeddingOrganizer';
import NumericInput from '../../../../../components/custom-components/InputNumberOnly';

const index = () => {
  const history = useHistory()

  const onFinish = async (values) => {
    const success = await postWeddingOrganizer(values)

    if (success.data.success) {
      message.success('Berhasil menambahkan WO')
      history.push("/admin/wedding-organizer")
    }
    else {
      message.error('Gagal menambahkan WO')
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (errorInfo.errorFields.length == 1) {
      message.error(errorInfo.errorFields[0].errors[0])
    }
    else {
      message.error("Mohon isi semua form yang ada")
    }
  };

  return (
    <CardForm title="Tambah Data WO">
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        colon={false}
        labelAlign="left"
      >
        <Form.Item
          label="Nama WO"
          name="name"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nama WO',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email WO"
          name="email"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan email!',
            },
            {
              type: "email",
              message: "Masukkan format email dengan benar!"
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
              message: 'Mohon masukkan nomor telepon WO',
            },
          ]}
        >
          <NumericInput />
        </Form.Item>

        <Form.Item
          label="Website WO"
          name="website"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan website WO',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Alamat WO"
          name="address"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan alamat WO',
            },
          ]}
        >
          <Input.TextArea />
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
            <Button danger htmlType="button" onClick={() => history.push("/admin/wedding-organizer")}>
              Batal
            </Button>
          </Space>
        </Form.Item>

      </Form>
    </CardForm>
  );
};


export default index