import { Button, Form, Space } from "antd";
import { useHistory } from "react-router-dom";
import React from "react";
import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { getOneUser } from "../../../../../../api/kelola-user/getOneUser";
import { getOneRole } from "../../../../../../api/role/getOneRole";

const index = (props) => {
  const history = useHistory();
  const title = `${props.location.state.permission} Data ${props.location.state.data}`;
  const id = props.location.state.id;
  const access_menu_id = props.location.state.access_menu_id;

  const { data: user } = getOneUser(id);
  const { data: role } = getOneRole(access_menu_id);

  return (
    <CardForm title={title} back>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        autoComplete="off"
        size="small"
        labelAlign="left"
        colon={false}
      >
        <Form.Item label="Nama" name="nama">
          <p>{user && user.name}</p>
        </Form.Item>

        <Form.Item label="Username" name="username">
          <p>{user && user.username}</p>
        </Form.Item>

        <Form.Item label="Email" name="email">
          <p>{user && user.email}</p>
        </Form.Item>

        <Form.Item label="Customer" name="customer">
          <p>{user?.customer?.name}</p>
        </Form.Item>

        {user?.wedding_organizer ? (
          <Form.Item label="Wedding Organizer" name="wedding_organizer">
            <p>{user?.wedding_organizer?.name}</p>
          </Form.Item>
        ) : undefined}

        {role ? (
          <Form.Item label="Role User" name="customer">
            <p>{role?.name}</p>
          </Form.Item>
        ) : undefined}

        <Form.Item label="Tipe User" name="type">
          <p>
            {user?.type == 1
              ? "Admin"
              : user?.type == 2
              ? "Content Creator"
              : user?.type == 3
              ? "Wo"
              : user?.type}
          </p>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <p>{user?.status == 1 ? "Aktif" : "Non Aktif"}</p>
        </Form.Item>

        <Form.Item label="Creator" name="creator">
          <p>{user && user.creator}</p>
        </Form.Item>

        <Form.Item></Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
