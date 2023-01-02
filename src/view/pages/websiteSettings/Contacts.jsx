import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useData } from "../../../api/website-settings/apiTemplate";

import {
  List,
  Skeleton,
  Button,
  Form,
  Input,
  InputNumber,
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

  let { data, error, loading, method } = useData("admin-contacts");
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

  const deleteContact = (id, name) => {
    Modal.confirm({
      title: `Apa anda yakin ingin menghapus ${name}?`,
      icon: <Danger color="red" />,
      okText: "Yakin",
      cancelText: "Batal",
      okType: "primary",
      onOk() {
        method.destroy(id);

        if (!error.destroy) {
          message.info(`Berhasil menghapus kontak ${name}!`);
        } else message.error(`Gagal menghapus kontak ${name}!`);
      },
    });
  };

  const create = async (value) => {
    await method.create(value);

    if (!error.create) {
      message.info("Berhasil menambahkan kontak baru!");
    } else message.error("Gagal menambahkan kontak baru!");
  };

  const updateStatus = async (id, value) => {
    await method.update(id, value);

    if (!error.update) {
      message.info("Status telah diubah!");
    } else {
      message.error("Gagal mengubah status, silakan coba kembali!");
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
          header={<Typography.Title level={4}>Kontak Admin</Typography.Title>}
          loading={loading.update || loading.destroy || loading.getAll}
          renderItem={(item) => (
            <>
              <List.Item
                actions={[
                  <Popover
                    content="delete"
                    key="delete-contact"
                    onClick={() => deleteContact(item?.id, item?.name)}
                  >
                    <Trash color="red" size={20} />
                  </Popover>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={item?.name}
                    description={
                      item?.type === 1 || item?.type === 3
                        ? `+62-${item?.value}`
                        : item?.value
                    }
                  />
                  <div>
                    <Select
                      value={statusConverter(item?.status)}
                      style={{
                        width: 120,
                      }}
                      onChange={(e) => {
                        if (e != item?.status)
                          updateStatus(item?.id, {
                            name: item?.name,
                            value: item?.value,
                            status: e,
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
              tambah kontak admin
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
  const [type, setType] = useState(4);

  const submitHandler = (e) => {
    if (name && value && type) {
      submit({ name, value, type });
      name && value && setIsAdding(false);
    }
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
          label="Nama Kontak"
          name="name"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama kontak!",
            },
          ]}
        >
          <Input
            value={name}
            placeholder="kontak admin 1, kontak admin 2, ..."
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Jenis Kontak"
          name="type"
          rules={[
            {
              required: true,
              message: "Mohon masukkan type kontak!",
            },
          ]}
        >
          <Select
            value={type}
            placeholder="wa, email, nomor telepon"
            onChange={(v) => setType(v)}
            options={[
              {
                value: 1,
                label: "Whatsapp",
              },
              {
                value: 2,
                label: "Email",
              },
              {
                value: 3,
                label: "Nomor Telepon",
              },
              {
                value: 4,
                label: "lainnya",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={
            type === 1
              ? "Nomor WA"
              : type === 2
              ? "Email"
              : type === 3
              ? "Nomor Telepon"
              : "Kontak"
          }
          name="value"
          rules={[
            {
              required: true,
              message: "Mohon masukkan kontak!",
            },
          ]}
        >
          {type === 1 || type === 3 ? (
            <InputNumber
              addonBefore="+62"
              value={value}
              placeholder="89..., 83..."
              onChange={(e) => setValue(e)}
            />
          ) : (
            <Input
              value={name}
              placeholder="email, kontak lain, ..."
              onChange={(e) => setValue(e.target.value)}
            />
          )}
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
