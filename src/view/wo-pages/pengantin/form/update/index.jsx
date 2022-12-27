import {
  Button,
  Form,
  Input,
  Space,
  DatePicker,
  TimePicker,
  message,
  InputNumber,
} from "antd";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CardForm from "../../../../components/custom-components/form-crud/CardForm";
import { putBride } from "../../../../../api/pengantin/putBride";
import { getOneBride } from "../../../../../api/pengantin/getOneBride";
import moment from "moment";
import NumericInput from "../../../../components/custom-components/InputNumberOnly";

const index = (props) => {
  const history = useHistory();
  const id = props.location.state.id;
  const { data: bride } = getOneBride(id);

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    setDate(bride?.wedding_date);
    setTime(bride?.wedding_time);
  }, [bride]);

  const onFinish = async (values) => {
    values.wedding_time = time;
    values.wedding_date = date;
    values.wedding_organizer_id = bride?.wedding_organizer_id;

    const response = await putBride(values, id);
    const success = response.data.success;
    if (success) {
      message.success("Berhasil mengubah data pengantin");
      history.goBack();
    } else {
      message.error("Gagal mengubah data pengantin");
    }
  };

  return (
    <CardForm title="Ubah Data Pengantin">
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
        labelAlign="left"
        colon={false}
        fields={[
          {
            name: ["groom"],
            value: bride && bride?.groom,
          },
          {
            name: ["bride"],
            value: bride && bride?.bride,
          },
          {
            name: ["phone"],
            value: bride && bride?.phone,
          },
          {
            name: ["address"],
            value: bride && bride?.address,
          },
          {
            name: ["wedding_address"],
            value: bride && bride?.wedding_address,
          },
          {
            name: ["wedding_place"],
            value: bride && bride?.wedding_place,
          },
          {
            name: ["wedding_organizer"],
            value: bride && bride?.wedding_organizer?.name,
          },
          {
            name: ["status"],
            value: bride && bride?.status,
          },
        ]}
      >
        <Form.Item label="Pengantin Pria" name="groom">
          <Input />
        </Form.Item>

        <Form.Item label="Pengantin Wanita" name="bride">
          <Input />
        </Form.Item>

        <Form.Item label="No Telp" name="phone">
          <NumericInput />
        </Form.Item>

        <Form.Item label="Alamat" name="address">
          <Input />
        </Form.Item>

        <Form.Item label="Tanggal Pernikahan" name="wedding_date">
          <DatePicker
            onChange={(value, stringDate) => {
              setDate(stringDate);
            }}
            format="YYYY-MM-DD"
            defaultPickerValue={moment(date)}
            placeholder={date}
          />
        </Form.Item>

        <Form.Item label="Waktu Pernikahan" name="wedding_time">
          <TimePicker
            onChange={(value, stringTime) => {
              setTime(stringTime);
            }}
            format="HH:mm"
            defaultPickerValue={moment(time)}
            placeholder={time}
          />
        </Form.Item>

        <Form.Item label="Alamat Pernikahan" name="wedding_address">
          <Input />
        </Form.Item>

        <Form.Item label="Tempat Pernikahan" name="wedding_place">
          <Input />
        </Form.Item>

        <Form.Item label="Wedding Organizer" name="wedding_organizer">
          <Input />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <InputNumber />
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
