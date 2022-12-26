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

  let { data, error, loading, method } = useData("social-medias");
  data = data.filter((d) => d.id !== undefined);

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
          message.info(`Berhasil menghapus sosial media ${name}!`);
        } else message.error(`Gagal menghapus sosial media ${name}!`);
      },
    });
  };

  const create = async (value) => {
    await method.create(value);

    if (!error.create) {
      message.info("Berhasil menambahkan media sosial baru!");
    } else message.error("Gagal menambahkan media sosial baru!");
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
          header={<Typography.Title level={4}>Sosial Media</Typography.Title>}
          loading={loading.update || loading.destroy || loading.getAll}
          renderItem={(item) => (
            <>
              <List.Item
                actions={[
                  <Popover
                    content="delete"
                    key="delete-contact"
                    onClick={() => destroy(item.id, item.name)}
                  >
                    <Trash color="red" size={20} />
                  </Popover>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta title={item.name} description={item.value} />
                  <div>
                    <Select
                      value={statusConverter(item.status)}
                      style={{
                        width: 120,
                      }}
                      onChange={(e) => {
                        if (e != item.status)
                          updateStatus(item.id, {
                            name: item.name,
                            value: item.value,
                            status: e,
                            icon: "-",
                          });
                      }}
                      options={[
                        {
                          value: "2",
                          label: "tidak aktif",
                        },
                        {
                          value: "1",
                          label: "aktif",
                        },
                      ]}
                    />
                  </div>
                </Skeleton>
              </List.Item>
            </>
          )}
        />
        {isAdding ? (
          <AddForm
            submit={create}
            setIsAdding={setIsAdding}
            createErr={error.create}
          />
        ) : (
          <div className="button">
            <Button
              disabled={loading.create}
              size="small"
              type="primary"
              danger
              onClick={() => setIsAdding(true)}
            >
              tambah akun media sosial
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

const AddForm = ({ submit, setIsAdding, createErr }) => {
  const [name, setName] = useState();
  const [value, setValue] = useState();

  const submitHandler = (e) => {
    submit({ name, value });
    name && value && setIsAdding(false);
  };

  return (
    <div className="addForm">
      <Form
        name="addForm"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Nama Social Media"
          name="name"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama social media!",
            },
          ]}
        >
          <Input
            value={name}
            placeholder="Instagram, Facebook, Twiter"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Nama Akun"
          name="value"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama akun!",
            },
          ]}
        >
          <Input
            value={value}
            placeholder="wo123"
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
