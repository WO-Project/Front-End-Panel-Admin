import { Button, Form, Input, Space, message, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';
import { postCustomer } from '../../../../../../api/customer/postCustomer';
import { useState } from 'react';
import NumericInput from '../../../../../components/custom-components/InputNumberOnly';

const index = () => {
  const history = useHistory()
  const [password, setPassword] = useState(null)
  const [inputStatus, setInputStatus] = useState("")

  const onFinish = async (values) => {
    if (inputStatus == "error") {
      message.error("Password dan Konfirmasi password berbeda")
      return
    }
    const success = await postCustomer(values)
    if (success) {
      message.success('Berhasil menambahkan customer')
      history.goBack()
    }
    else {
      message.error('Gagal menambahkan customer')
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

  const passwordConfirm = (e) => {
    if (password == e) {
      setInputStatus("")
    }
    else
      setInputStatus("error")
  }

  return (
    <CardForm title="Tambah data customer">
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
          label="Nama"
          name="name"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nama',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan username',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan email',
            },
            {
              type: "email",
              message: 'Gunakan format email dengan benar',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nomor telp"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nomor telepon',
            },
          ]}
        >
          <NumericInput />
        </Form.Item>

        <Form.Item
          label="Alamat"
          name="address"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan alamat',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan password',
            },
            {
              min: 8,
              message: "Mohon masukkan password minimal 8 karakter"
            }
          ]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} status={inputStatus} />
        </Form.Item>

        <Form.Item
          label="Konfirmasi Password"
          name="password_confirmation"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan konfirmasi password',
            },
            {
              min: 8,
              message: "Mohon masukkan konfirmasi password minimal 8 karakter"
            }
          ]}
        >
          <Input.Password onChange={(e) => passwordConfirm(e.target.value)} status={inputStatus} />
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