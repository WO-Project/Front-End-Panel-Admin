import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { api } from "../../../../../configs/apiConfig";
import {
  ADMIN_NAME,
  ADMIN_USERNAME,
  ADMIN_MAIL,
} from "../../../../../redux/customise/customiseTypes";

import { FiUser } from "react-icons/fi";
import { GiPadlock } from "react-icons/gi";

import { Button, Checkbox, Form, Input, message } from "antd";

import "./Login.css";
import { usePermissionContext } from "../../../../../context/PermissionContext";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const history = useHistory();

  const { fetchApi } = usePermissionContext();

  useEffect(() => {
    if (localStorage.getItem("token")) window.location.href = "/";
  }, [isAuth]);

  const tryLogin = async () => {
    if (username && password) {
      await api
        .post("login", { username: username, password: password })
        .then(async (response) => {
          console.log(response.data.data.data.access_menu_id);
          console.log(response.data.data.access_token);
          localStorage.setItem(
            "token",
            `${response.data.data.token_type} ${response.data.data.access_token}`
          );
          localStorage.setItem("id", response.data.data.data.id);

          props.login({
            adminName: response.data.data.name,
            adminUsername: response.data.data.username,
            adminMail: response.data.data.email,
          });

          setIsAuth(true);
          await fetchApi();

          await history.push("/dashboard");

          message.info("Selamat Datang!");
        })
        .catch((err) => {
          message.error(
            "Gagal Login! Silakan periksa username dan password Anda!"
          );
        });
    }
  };

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
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
          <Input
            prefix={<FiUser />}
            placeholder="Masukkan Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Mohon masukkan password!",
            },
          ]}
        >
          <Input.Password
            prefix={<GiPadlock />}
            placeholder="Masukkan Password"
            className="ant-col"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <div className="custom-redirect-container">
          <a href="/" className="custom-redirect-login">
            Lupa password?
          </a>
        </div>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button
            type="primary"
            onClick={tryLogin}
            danger
            htmlType="submit"
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminUsername,
    adminName: state.adminName,
    adminEmail: state.adminEmail,
  };
};

const mapDispatcherToProps = (dispather) => {
  return {
    login: (data) => {
      dispather({ type: ADMIN_NAME, payload: data.adminName });
      dispather({ type: ADMIN_USERNAME, payload: data.adminUser });
      dispather({ type: ADMIN_MAIL, payload: data.adminMail });
    },
  };
};

export default connect(mapStateToProps, mapDispatcherToProps)(LoginForm);
