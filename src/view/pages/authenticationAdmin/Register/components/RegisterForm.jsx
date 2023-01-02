import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
  ADMIN_NAME,
  ADMIN_USERNAME,
  ADMIN_MAIL,
} from "../../../../../redux/customise/customiseTypes";

import { FiUser } from "react-icons/fi";
import { GiPadlock } from "react-icons/gi";

import { Button, Checkbox, Form, Input } from "antd";

import "./Register.css";

function RegisterForm(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) history.push("/");
  }, [isAuth]);

  const tryRegister = async () => {
    console.log(name, email, username, password);
    await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/register",
      data: {
        name: name,
        email: email,
        username: username,
        password: password,
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.data.access_token);
        localStorage.setItem(
          "token",
          `${response.data.data.token_type} ${response.data.data.access_token}`
        );

        props.login({
          adminName: response.data.data.name,
          adminUsername: response.data.data.username,
          adminMail: response.data.data.email,
        });

        setIsAuth(true);
      })
      .catch((err) => {
        alert("Gagal Login! | " + err);
      });
  };

  return (
    <>
      <Form
        name="basic"
        // layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          values={name}
          onChange={(e) => setName(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          values={username}
          onChange={(e) => setUsername(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          values={email}
          onChange={(e) => setEmail(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          values={password}
          onChange={(e) => setPassword(e.target.value)}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="input placeholder" className="ant-col" />
        </Form.Item>

        <div className="custom-redirect-container">
          <Checkbox>Remember me</Checkbox>
          <a href="/admin/login" className="custom-redirect-register">
            sudah punya akun?
          </a>
        </div>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" onClick={tryRegister}>
            Register
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

export default connect(mapStateToProps, mapDispatcherToProps)(RegisterForm);
