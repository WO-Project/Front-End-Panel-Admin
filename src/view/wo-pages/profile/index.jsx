import { useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useUserDetail, updateUser, updatePw } from "../../../api/user";

import {
  Button,
  Form,
  Space,
  Input,
  Spin,
  Select,
  message,
  Typography,
} from "antd";

import CardForm from "../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../components/custom-components/Feedback/ErrorPage";
import LoadingSpinner from "../../components/custom-components/LoadingSpinner";
import FAQ from "./FAQ";
import TermConditions from "./TermConditions";
import PrivacyPolicies from "./PrivacyPolicies";

const EditProfile = (props) => {
  const history = useHistory();
  const id = localStorage.getItem("id");

  const editProfileForm = useRef();

  const [isEdit, setIsEdit] = useState(false);
  const [isEditPw, setIsEditPw] = useState(false);
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

  const onSubmitedProfile = async () => {
    const data = {
      name,
      username,
      email,
      status: 1,
    };

    const response = await updateUser(id, data);

    if (response?.data?.success) {
      message.success("Berhasil mengubah profil");
      setIsEdit(false);
    } else {
      message.error(`Gagal memperbarui profil!: ${response}`);
    }
  };

  const onFailedSubmitedProfile = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  if (err) {
    return <ErrorPage message="Gagal Mengambil Data" />;
  }

  if (loading) {
    return <Spin />;
  }

  if (isEditPw) return <EditPwForm setIsEditPw={setIsEditPw} id={id} />;

  if (isEdit) {
    return (
      <>
        <CardForm
          title={
            <Typography.Title
              level={4}
            >{`Edit Profile ${name}`}</Typography.Title>
          }
        >
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            autoComplete="off"
            onFinish={onSubmitedProfile}
            onFinishFailed={onFailedSubmitedProfile}
            labelAlign="left"
            colon={false}
            ref={editProfileForm}
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
                <Form.Item label="Telepon" name="phone" initialValue={null}>
                  <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  // defaultValue={email}
                  />
                </Form.Item>
                <Form.Item label="Alamat" name="address" initialValue={null}>
                  <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  // defaultValue={email}
                  />
                </Form.Item>
                <Form.Item
                  label="Foto Profil"
                  name="attachment"
                  initialValue={null}
                >
                  <Upload />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 4,
                    span: 4,
                  }}
                >
                  <Space size="middle">
                    <Button
                      size="small"
                      type="primary"
                      danger
                      htmlType="button"
                      onClick={() => editProfileForm.current.submit()}
                    >
                      Simpan
                    </Button>
                    <Button
                      danger
                      size="small"
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
      <CardForm
        title={
          <Typography.Title level={4}>{`Profile ${name}`}</Typography.Title>
        }
      >
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          autoComplete="off"
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
                    size="small"
                    type="primary"
                    danger
                    style={{ width: 125 }}
                    onClick={(e) => {
                      setIsEdit(true);
                      e.stopPropagation();
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    danger
                    style={{ width: 135 }}
                    onClick={(e) => {
                      setIsEditPw(true);
                    }}
                  >
                    Ganti Password
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

function EditPwForm({ setIsEditPw, id }) {
  const form = useRef();

  const [oldPw, setOldPw] = useState();
  const [newPw, setNewPw] = useState();
  const [confirmationPw, setConfirmationPw] = useState();

  const onSubmitedPw = async () => {
    const data = {
      old_password: oldPw,
      password: newPw,
      password_confirmation: confirmationPw,
    };

    if (newPw != confirmationPw) {
      message.error("Password baru dan konfirmasi password tidak sama!");
      return;
    }

    const response = await updatePw(id, data);

    if (response?.response?.data?.data?.error == "Wrong Old Password") {
      message.error("Password lama salah!");
      return;
    }

    if (response?.data?.success) {
      message.success("Berhasil memperbarui password");
      setIsEditPw(false);
    } else {
      message.error(`Gagal memperbarui password!`);
    }
  };

  const onFailedSubmitedPw = (errorInfo) => {
    alert("Failed:", errorInfo);
  };

  return (
    <>
      <CardForm
        title={
          <Typography.Title
            level={4}
          >{`Edit Profile ${name}`}</Typography.Title>
        }
      >
        <Form
          ref={form}
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 13,
          }}
          autoComplete="off"
          onFinish={onSubmitedPw}
          onFinishFailed={onFailedSubmitedPw}
          labelAlign="left"
          colon={false}
        >
          <Form.Item
            label="Password Lama"
            name="oldPw"
            rules={[
              {
                required: true,
                message: "Isi password lama!",
              },
            ]}
          >
            <Input.Password
              value={oldPw}
              onChange={(e) => setOldPw(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password Baru"
            name="newPw"
            rules={[
              {
                required: true,
                message: "Isi password lama!",
              },
            ]}
          >
            <Input.Password
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Konfirmasi Password"
            name="confirmationPw"
            rules={[
              {
                required: true,
                message: "Isi password lama!",
              },
            ]}
          >
            <Input.Password
              value={confirmationPw}
              onChange={(e) => setConfirmationPw(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 4,
            }}
          >
            <Space size="middle">
              <Button
                size="small"
                type="primary"
                danger
                onClick={() => form.current.submit()}
              >
                Simpan
              </Button>
              <Button
                size="small"
                danger
                onClick={(e) => {
                  setIsEditPw(false);
                }}
              >
                Batal
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </CardForm>
    </>
  );
}

export default function index() {
  return (
    <>
      <EditProfile />
      <div
        style={{
          backgroundColor: "white",
          marginTop: 50,
          paddingTop: 30,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "stretch",
        }}
      >
        <Typography.Title
          level={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          Tentang Best Wishes
        </Typography.Title>
        <FAQ />
        <TermConditions />
        <PrivacyPolicies />
      </div>
    </>
  );
}
