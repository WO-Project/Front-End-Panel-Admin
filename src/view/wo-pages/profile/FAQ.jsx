import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useData } from "../../../api/website-settings/apiTemplate";

import {
  List,
  Skeleton,
  Button,
  Form,
  Input,
  Space,
  Select,
  Modal,
  Popover,
  Typography,
  message,
} from "antd";
import { Trash, Danger } from "iconsax-react";

export default function () {
  const [isAdding, setIsAdding] = useState(false);
  const history = useHistory();

  let { data, error, loading, method } = useData("frequently-ask-questions");
  data = data
    .filter((d) => d.id !== undefined && d.status != 2)
    .map((d, index) => ({ ...d, index: index + 1 }));

  useEffect(() => {
    setIsAdding(false);
  }, []);

  const statusConverter = (status) => {
    switch (status) {
      case 2:
        return "tidak aktif";
      case 1:
        return "aktif";
      default:
        return "status tidak ditemukan!";
    }
  };

  const destroy = (id, name) => {
    Modal.confirm({
      title: `Apa anda yakin ingin menghapus ${name}?`,
      icon: <Danger color="red" />,
      okText: "Yakin",
      cancelText: "Batal",
      okType: "primary",
      onOk() {
        method.destroy(id);

        if (!error.destroy) {
          message.info(`Berhasil menghapus FAQ!`);
        } else message.error(`Gagal menghapus FAQ!`);
      },
    });
  };

  const create = async (value) => {
    await method.create(value);

    if (!error.create) {
      message.info("Berhasil menambahkan FAQ baru!");
    } else message.error("Gagal menambahkan FAQ baru!");
  };

  const updateStatus = async (id, value) => {
    await method.update(id, value);

    if (!error.update) {
      message.info("Status telah diubah!");
    } else {
      message.error("Gagal mengubah status. Silakan coba kembali!");
      setTimeout(() => {
        history.push("/admin/pengaturan-website");
      }, 1500);
    }
  };

  return (
    <>
      <div className="custom_website-settings">
        <List
          itemLayout="horizontal"
          dataSource={data}
          header={
            <Typography.Title level={4}>
              Frequently Asked Questions
            </Typography.Title>
          }
          loading={loading.update || loading.destroy || loading.getAll}
          renderItem={(item) => (
            <>
              <List.Item>
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<h1>{item.index}</h1>}
                    title={item.name}
                    description={item.answer}
                  />
                </Skeleton>
              </List.Item>
            </>
          )}
        />
      </div>
    </>
  );
}

const AddForm = ({ submit, setIsAdding, createErr }) => {
  const [name, setName] = useState();
  const [value, setValue] = useState();

  const submitHandler = (e) => {
    if ((name, value)) {
      submit({ name, answer: value, wedding_organizer_id: 0 });
      name && value && setIsAdding(false);
    }
  };

  return (
    <div className="addForm">
      <Form
        name="addForm"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 12,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Pertanyaan"
          name="name"
          rules={[
            {
              required: true,
              message: "Mohon masukkan pertanyaan!",
            },
          ]}
        >
          <Input.TextArea
            rows={5}
            value={name}
            placeholder="question"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Jawaban"
          name="anser"
          rules={[
            {
              required: true,
              message: "Mohon masukkan jawaban!",
            },
          ]}
        >
          <Input.TextArea
            rows={5}
            value={value}
            placeholder="answer"
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Space
            size="small"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Button
              htmlType="submit"
              type="primary"
              danger
              onClick={submitHandler}
            >
              Simpan
            </Button>
            <Button danger htmlType="button" onClick={() => setIsAdding(false)}>
              Batal
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
