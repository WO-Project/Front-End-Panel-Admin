import { Button, Form, Input, Space, message, Select, Spin } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { putUser } from "../../../../../../api/kelola-user/putUser";
import { getOneUser } from "../../../../../../api/kelola-user/getOneUser";
import { getRoles } from "../../../../../../api/role/getRoles";
import { getWeddingOrganizers } from "../../../../../../api/wedding-organizer/getWeddingOrganizers";
import { useState } from "react";

const index = (props) => {
  const history = useHistory();
  const [type, setType] = useState(null);
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;

  const { data: user, loading } = getOneUser(id);
  const { data: roles } = getRoles();
  const { data: wos } = getWeddingOrganizers();

  const onFinish = async (values) => {
    values.type = values.type == undefined ? user?.type : type;
    const success = await putUser(values, id);

    if (success.data.success) {
      message.success("Berhasil mengubah data user");
      history.goBack();
    } else message.error("Gagal mengubah data user");
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
            name: "name",
            value: user?.name,
          },
          {
            name: "username",
            value: user?.username,
          },
          {
            name: "email",
            value: user?.email,
          },
          {
            name: "access_menu_id",
            value: user?.access_menu_id,
          },
          {
            name: "wo",
            value: user?.wedding_organizer?.id,
          },
          {
            name: "status",
            value: user?.status,
          },
        ]}
      >
        <Form.Item
          label="Nama"
          name="name"
          rules={[
            {
              required: true,
              message: "Masukkan nama dengan benar!",
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
              message: "Masukkan username dengan benar!",
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
              type: "email",
              message: "Masukkan format email dengan benar!",
            },
            {
              required: true,
              message: "Masukkan email anda!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tipe User"
          name="type"
          rules={[
            {
              required: true,
              message: "Pilih tipe user dengan benar!",
            },
          ]}
        >
          {loading ? (
            <Spin></Spin>
          ) : (
            <Select
              defaultValue={user?.type}
              style={{
                width: 200,
              }}
              onSelect={(e) => setType(e)}
            >
              <Option value={1}>Admin</Option>
              <Option value={1}>Content Creator</Option>
              <Option value={3}>Wo</Option>
            </Select>
          )}
        </Form.Item>

        {user?.type == 3 || type == 3 ? (
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
              message: "Masukkan role user dengan benar!",
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
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Masukkan status dengan benar!",
            },
          ]}
        >
          <Select
            style={{
              width: 200,
            }}
          >
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
