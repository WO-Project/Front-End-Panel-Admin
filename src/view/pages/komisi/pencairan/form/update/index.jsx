import { useState } from "react";
import { useHistory } from "react-router-dom";

import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Space,
  message,
  InputNumber,
  Input,
  Select,
  Upload,
} from "antd";

import CardForm from "../../../../../components/custom-components/form-crud/CardForm";
import { getOneDisbursement } from "../../../../../../api/disbursement/getOneDisbursement";
import { putTransfer } from "../../../../../../api/disbursement/putTransfer";

const index = (props) => {
  const history = useHistory();
  const id = props.location.state.id;
  const { data, error } = getOneDisbursement(id);

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

  const onFinish = async (values) => {
    const form = new FormData();
    if (error) {
      message.error("Gagal transfer");
      return;
    }

    form.append("user_id", data.user_id);
    form.append("commission_id", data.commission_id);
    form.append("_method", "PUT");
    form.append("status", 2);
    Object.keys(values).forEach((data) => {
      form.append(data, values[data]);
    });
    form.append("thumbnail", thumbnail);
    const response = await putTransfer(form, id);

    if (response) {
      message.success("Berhasil transfer");
      history.goBack();
    } else {
      message.error("Gagal transfer");
    }
  };

  return (
    <CardForm title="Ubah Data Pesanan">
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
        fields={[
          {
            name: ["request_nominal"],
            value: data && data?.request_nominal,
          },
        ]}
        colon={false}
      >
        <Form.Item
          label="Request Nominal"
          name="request_nominal"
          rules={[
            {
              required: true,
              message: "Request nominal harus diisi!",
            },
          ]}
        >
          <InputNumber
            disabled
            style={{
              width: "100%",
            }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            addonBefore="Rp"
          />
        </Form.Item>

        <Form.Item
          label="Nama Pencairan"
          name="disbursement_name"
          rules={[
            {
              required: true,
              message: "Nama pencairan harus diisi!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tipe Pencairan"
          name="disbursement_type"
          rules={[
            {
              required: true,
              message: "tipe pencairan harus diisi!",
            },
          ]}
        >
          <Select
            options={[
              { label: "Cash", value: 1 },
              { label: "Transfer", value: 2 },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Bank"
          name="disbursement_bank"
          rules={[
            {
              required: true,
              message: "Bank harus diisi!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nomor Rekening"
          name="disbursement_norek"
          rules={[
            {
              required: true,
              message: "Nomor rekening harus diisi!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Nominal Ditransfer"
          name="disbursement_nominal"
          rules={[
            {
              required: true,
              message: "Nominal yang ditransfer harus diisi!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            addonBefore="Rp"
          />
        </Form.Item>

        <Form.Item label="Bukti Pembayaran" name="thumbnail">
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
