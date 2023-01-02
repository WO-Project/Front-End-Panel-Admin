import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

import {
  Button,
  Form,
  Input,
  Space,
  message,
  Select,
  Upload,
  DatePicker,
  InputNumber,
} from "antd";

import CardForm from "../../../../components/custom-components/form-crud/CardForm";

import { createKupon } from "../../../../../api/kupon";

const index = (props) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  const [nominal, setNominal] = useState(0);
  const [quota, setQuota] = useState(0);
  const [begin_date, setBeginDate] = useState();
  const [end_date, setEndDate] = useState();
  const [typeQuota, setTypeQuota] = useState();

  const onFinish = async () => {
    const response = await createKupon({
      name,
      type,
      nominal,
      quota: typeQuota == 2 ? quota : null,
      begin_date,
      end_date,
    });

    if (response?.data?.success) {
      message.success("Berhasil menambahkan artikel");
      history.goBack();
    } else {
      message.error(
        `Gagal menambahkan artikel!: ${response?.response?.data?.message}`
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (errorInfo.errorFields.length == 1) {
      message.error(errorInfo.errorFields[0].errors[0]);
    } else {
      message.error("Mohon isi semua form yang ada");
    }
  };

  const disabledDate = (current) => {
    return current < dayjs().startOf("day");
  };

  return (
    <CardForm title="Tambah data voucher/kupon">
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelAlign="left"
        colon={false}
      >
        <Form.Item
          label="Nama"
          key="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nama voucher!",
            },
          ]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label={type === 1 ? "Persentase" : "Nominal"}
          key="nominal"
          name="nominal"
          rules={[
            {
              required: true,
              message: "Mohon masukkan nominal diskon!",
            },
            {
              type: "number",
              message: "Mohon masukkan dengan format angka!",
            },
          ]}
        >
          <InputNumber
            value={nominal}
            onChange={(value) => setNominal(value)}
            style={{
              width: "100%",
            }}
            addonBefore={
              <Select
                onChange={(value) => setType(value)}
                value={type}
                style={{ width: 60 }}
                defaultValue={1}
              >
                <Select.Option value={1}>%</Select.Option>
                <Select.Option value={2}>Rp</Select.Option>
              </Select>
            }
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Jenis Kuota"
          name="type"
          rules={[
            {
              required: true,
              message: "Mohon masukkan type kuota!",
            },
          ]}
        >
          <Select
            value={typeQuota}
            onChange={(e) => setTypeQuota(e)}
            options={[
              { label: "Unlimited", value: 1 },
              { label: "Limited", value: 2 },
            ]}
          />
        </Form.Item>

        {typeQuota === 2 && (
          <Form.Item
            label="Kuota"
            key="quota"
            name="quota"
            rules={[
              {
                required: true,
                message: "Mohon masukkan kuota voucher!",
              },
              {
                type: "number",
                message: "Mohon masukkan dengan format angka!",
              },
            ]}
          >
            <InputNumber
              min={1}
              style={{
                width: "100%",
              }}
              value={quota}
              onChange={(value) => setQuota(value)}
            />
          </Form.Item>
        )}

        <Form.Item
          label="Mulai"
          key="begin_date"
          name="begin_date"
          rules={[
            {
              required: true,
              message: "Mohon masukkan tanggal mulainya voucher berlaku!",
            },
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            onChange={(value, stringValue) => setBeginDate(stringValue)}
            value={begin_date}
          />
        </Form.Item>

        <Form.Item
          label="Kadaluwarsa"
          key="end_date"
          name="end_date"
          rules={[
            {
              required: true,
              message: "Mohon masukkan tanggal kadaluwarsa voucher!",
            },
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            onChange={(value, stringValue) => setEndDate(stringValue)}
            value={end_date}
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
