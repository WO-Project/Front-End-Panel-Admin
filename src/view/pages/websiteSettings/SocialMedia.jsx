import { useEffect, useState } from "react";

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
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Trash, Danger } from "iconsax-react";
import { asset } from "../../../configs/apiConfig";

export default function () {
  const [isAdding, setIsAdding] = useState(false);

  let { data, error, loading, method } = useData("social-medias");
  data = data.filter((d) => d.id !== undefined);

  console.log(data);

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
    await method.createResources(value);

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
                  <List.Item.Meta
                    avatar={
                      <img
                        src={asset(item.icon)}
                        alt="icon"
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "contain",
                        }}
                      />
                    }
                    title={item.name}
                    description={item.value}
                  />
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

const AddForm = ({ submit, setIsAdding, uploadHandler, createErr }) => {
  const [name, setName] = useState();
  const [value, setValue] = useState();
  const [thumbnail, setThumbnail] = useState();

  const thumbnailOnChangeHandler = (i) => {
    if (i.fileList.length === 0) setThumbnail("");
    else {
      i.file.status = "done";

      const isJpgOrPng =
        i.file.type === "image/jpeg" || i.file.type === "image/png";

      if (!isJpgOrPng) {
        message.error("File yang diterima berformat JPG/PNG!");
      }

      const isLt2M = i.file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Ukuran maksimal file 2MB!");
      }

      if (!isJpgOrPng || !isLt2M) {
        i.fileList.splice(0, 1);
      } else {
        setThumbnail(i.file.originFileObj);
      }
    }
  };

  const submitHandler = (e) => {
    const form = new FormData();

    if (name && value) {
      form.append("name", name);
      form.append("value", value);
      form.append("icon", thumbnail);
      submit(form);
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
          label="Link Akun"
          name="value"
          rules={[
            {
              required: true,
              message: "Mohon masukkan link akun!",
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
          label="Icon"
          name="icon"
          rules={[
            {
              required: true,
              message: "Mohon masukkan icon!",
            },
          ]}
        >
          <Upload
            accept=".jpg,.png,.jpeg,.svg"
            customRequest={undefined}
            className="avatar-uploader"
            listType="picture"
            maxCount={1}
            onChange={thumbnailOnChangeHandler}
          >
            {!thumbnail && (
              <Button icon={<UploadOutlined />}>
                Upload file png atau jpg
              </Button>
            )}
          </Upload>
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
