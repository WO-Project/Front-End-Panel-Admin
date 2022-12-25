import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import {
  Button,
  Form,
  Space,
  Spin,
  Input,
  InputNumber,
  DatePicker,
  Select,
  message,
} from "antd";

import CardForm from "../../../../components/custom-components/form-crud/CardForm";
import ErrorPage from "../../../../components/custom-components/Feedback/ErrorPage";

import { useKuponDetail, updateKupon } from "../../../../../api/kupon";

const index = () => {
  const history = useHistory();
  const { id } = useParams();
  const { data, err, loading } = useKuponDetail(id);

  const [name, setName] = useState("");
  const [type, setType] = useState(0);
  const [nominal, setNominal] = useState(0);
  const [quota, setQuota] = useState(0);
  const [begin_date, setBeginDate] = useState();
  const [end_date, setEndDate] = useState();
  const [status, setStatus] = useState(1);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setType(data.type);
      setNominal(data.nominal);
      setQuota(data.quota);
      setBeginDate(data.begin_date);
      setEndDate(data.end_date);
      setStatus(data.status);
    }
  }, [data]);

  const onFinish = async () => {
    const response = await updateKupon(id, {
      name,
      type,
      nominal,
      quota,
      begin_date,
      end_date,
      status,
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
    alert("Failed:", errorInfo);
  };

  const disabledDate = (current) => {
    return current < dayjs().startOf("day");
  };

  if (loading)
    return (
      <CardForm title={`Detail Data Voucher/Kupon ${data?.name}`}>
        <Spin />
      </CardForm>
    );

  if (err) return <ErrorPage message={err} />;

  return (
    <CardForm title={`Detail Data Voucher/Kupon ${data?.name}`}>
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
        <Form.Item label="Nama" name="name" key="name" initialValue={name}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label={type === 1 ? "Persentase" : "Nominal"}
          name="nominal"
          key="nominal"
          initialValue={nominal}
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
                defaultValue={type}
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

        <Form.Item label="Kuota" name="quota" key="quota" initialValue={quota}>
          <InputNumber
            style={{
              width: "100%",
            }}
            value={quota}
            onChange={(value) => setQuota(value)}
          />
        </Form.Item>

        <Form.Item
          label="Mulai"
          name="begin_date"
          key="begin_date"
          initialValue={moment(begin_date)}
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
          name="end_date"
          key="end_date"
          initialValue={moment(end_date)}
        >
          <DatePicker
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            onChange={(value, stringValue) => setEndDate(stringValue)}
            value={end_date}
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          key="status"
          initialValue={status}
        >
          <Select onChange={(v) => setStatus(v)}>
            <Select.Option value={1}>Aktif</Select.Option>
            <Select.Option value={2}>Non-aktif</Select.Option>
          </Select>
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
              Kembali
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </CardForm>
  );
};

export default index;
