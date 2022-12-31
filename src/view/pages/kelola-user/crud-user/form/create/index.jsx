import { Button, Form, Input, Space, message, Select } from "antd";
import { useHistory } from "react-router-dom";
import { postUser } from "../../../../../../api/kelola-user/postUser";
import React from "react";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { getWeddingOrganizers } from "../../../../../../api/wedding-organizer/getWeddingOrganizers";
import { getRoles } from "../../../../../../api/role/getRoles";
import { useState } from "react";

const index = () => {
  const history = useHistory();
  const [type, setType] = useState(null);

  const { data: wos } = getWeddingOrganizers();
  const { data: roles } = getRoles();

  const onFinish = async (values) => {
    const success = await postUser(values);
    if (success.data.success) {
      message.success("Berhasil menambahkan user");
      history.goBack();
    } else {
      message.error("Gagal menambahkan user");
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (errorInfo.errorFields.length == 1) {
      message.error(errorInfo.errorFields[0].errors[0]);
    } else {
      message.error("Mohon isi semua form yang ada");
    }
  };

  return (
    <CardForm title="Tambah Data User">
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 13,
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
              message: "Mohon masukkan nama!",
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
              message: "Mohon masukkan username!",
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
              message: "Mohon masukkan email!",
            },
            {
              type: "email",
              message: "Masukkan format email dengan benar!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Mohon masukkan password anda!",
            },
            {
              min: 8,
              message: "Mohon masukkan password minimal 8 karakter",
            },
          ]}
        >
          <Input.Password minLength={8} />
        </Form.Item>

        <Form.Item
          label="Tipe User"
          name="type"
          rules={[
            {
              required: true,
              message: "Mohon masukkan tipe user!",
            },
          ]}
        >
          <Select
            style={{
              width: 200,
            }}
            onSelect={(e) => setType(e)}
          >
            <Option value={1}>Admin</Option>
            <Option value={1}>Content Creator</Option>
            <Option value={3}>Wo</Option>
          </Select>
        </Form.Item>

        {type == 3 ? (
          <Form.Item
            label="Wedding Organizer"
            name="wo"
            rules={[
              {
                required: true,
                message: "Pilih wedding organizer dengan benar!",
              },
            ]}
          >
            <Select
              style={{
                width: 200,
              }}
            >
              {wos?.map((wo, i) => (
                <Option key={i} value={wo?.id}>
                  {wo?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : undefined}

        <Form.Item
          label="Role User"
          name="access_menu_id"
          rules={[
            {
              required: true,
              message: "Mohon masukkan role user!",
            },
          ]}
        >
          <Select
            style={{
              width: 200,
            }}
          >
            {roles?.map((role, i) => (
              <Option key={i} value={role?.id}>
                {role?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 4,
          }}
        >
          <Space size="middle">
            <Button type="primary" danger htmlType="submit">
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

export default index;
