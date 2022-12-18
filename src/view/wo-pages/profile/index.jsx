import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useUserDetail, updateUser } from "../../../api/user";

import {
  Button,
  Form,
  Space,
  Input,
  Spin,
  Select,
  message,
  Upload,
} from "antd";

import CardForm from "../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../components/custom-components/Feedback/ErrorPage";

const index = (props) => {
  const history = useHistory();
  const id = localStorage.getItem("id");

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { data, err, loading } = useUserDetail(id);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setUsername(data.username);
      setEmail(data.email);
    }
  }, [data]);

  const onFinish = async () => {
    const data = {
      name,
      username,
      email,
      status: 1,
    };

    const response = await updateUser(id, data);

    if (response?.data?.success) {
      message.success("Berhasil mengubah artikel");
      setIsEdit(false);
    } else {
      message.error(`Gagal memperbarui artikel!: ${response}`);
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  if (err) {
    return <ErrorPage message="Gagal Mengambil Data" />;
  }

  if (loading) {
    return <Spin />;
  }

  if (isEdit) {
    return (
      <>
        <CardForm title={`Edit Profile ${name}`}>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelAlign="left"
            colon={false}
          >
            {loading ? (
              <Spin size="large" />
            ) : (
              <>
                <Form.Item label="Nama" name="name" initialValue={name}>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={name}
                  />
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="username"
                  initialValue={username}
                >
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    defaultValue={username}
                  />
                </Form.Item>
                <Form.Item label="Email" name="email" initialValue={email}>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={email}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 4,
                    span: 4,
                  }}
                >
                  <Space size="middle">
                    <Button type="primary" danger htmlType="submit">
                      Simpan
                    </Button>
                    <Button
                      danger
                      type="primary"
                      htmlType="button"
                      onClick={() => setIsEdit(false)}
                    >
                      Batal
                    </Button>
                  </Space>
                </Form.Item>
              </>
            )}
          </Form>
        </CardForm>
      </>
    );
  }

  return (
    <>
      <CardForm title={`Profile ${name}`}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelAlign="left"
          colon={false}
        >
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <Form.Item label="Nama" name="name" initialValue={name}>
                {name}
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                initialValue={username}
              >
                {username}
              </Form.Item>
              <Form.Item label="Email" name="email" initialValue={email}>
                {email}
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 4,
                }}
              >
                <Space size="middle">
                  <Button
                    danger
                    type="primary"
                    htmlType="button"
                    onClick={() => history.goBack()}
                  >
                    Kembali
                  </Button>
                  <Button type="primary" danger onClick={() => setIsEdit(true)}>
                    Edit
                  </Button>
                </Space>
              </Form.Item>
            </>
          )}
        </Form>
      </CardForm>
    </>
  );
};

export default index;
