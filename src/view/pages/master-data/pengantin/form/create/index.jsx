import { Button, Form, Input, Space, message, DatePicker, TimePicker, Select, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';
import { postBride } from '../../../../../../api/pengantin/postBride';
import { getWeddingOrganizers } from '../../../../../../api/wedding-organizer/getWeddingOrganizers';
import { Warning2 } from 'iconsax-react';
import NumericInput from '../../../../../components/custom-components/InputNumberOnly';

const index = () => {
  const history = useHistory()
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)

  const { data: wo } = getWeddingOrganizers()
  const { confirm } = Modal

  useEffect(() => {
    if (wo?.length == 0)
      confirm({
        title: 'Tidak Dapat Tambah Pengantin',
        icon: <Warning2 primary />,
        content: 'Tambahkan data WO terlebih dahulu',
        onOk() {
          history.push('/admin/wedding-organizer/create')
        },
        onCancel() {
          history.goBack()
        },
        okType: "primary",
        okText: "Tambah WO",
        cancelText: 'Kembali'
      })
  }, [wo])

  const onFinish = async (values) => {
    values.wedding_time = time
    values.wedding_date = date
    const response = await postBride(values)
    const success = response.data.success

    if (success) {
      message.success("Berhasil menambahkan pengantin")
      history.goBack()
    }
    else {
      message.error("Gagal menambahkan pengantin")
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (errorInfo.errorFields.length == 1) {
      message.error(errorInfo.errorFields[0].errors[0])
    }
    else {
      message.error("Mohon isi semua form yang ada")
    }
  };

  return (
    <CardForm title="Tambah Data Pengantin">
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        colon={false}
        labelAlign="left"
      >
        <Form.Item
          label="Pengantin Pria"
          name="groom"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nama pengantin pria',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Pengantin Wanita"
          name="bride"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nama pengantin wanita',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nomor Telp"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nomor telepon',
            },
          ]}
        >
          <NumericInput />
        </Form.Item>

        <Form.Item
          label="Alamat"
          name="address"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan alamat',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Tanggal Pernikahan"
          name="wedding_date"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan tanggal pernikahan',
            },
          ]}
        >
          <DatePicker format='YYYY-MM-DD' placeholder='Tanggal'
            onChange={(value, dateString) => {
              setDate(dateString);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Waktu Pernikahan"
          name="wedding_time"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan waktu pernikahan',
            },
          ]}
        >
          <TimePicker format='HH:mm' placeholder='Waktu'
            onChange={(value, timeString) => {
              setTime(timeString);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Alamat Pernikahan"
          name="wedding_address"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan alamat pernikahan',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Tempat Pernikahan"
          name="wedding_place"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan tempat pernikahan',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Wedding Organizer"
          name="wedding_organizer_id"
          rules={[
            {
              required: true,
              message: 'Mohon pilih Wedding Organizer',
            },
          ]}
        >
          <Select
            style={{
              width: 200,
            }}
          >
            {wo?.map((value) => (
              <Option value={value?.id}>{value?.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 4,
          }}
        >
          <Space size='middle'>
            <Button type='primary' danger htmlType="submit">
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


export default index