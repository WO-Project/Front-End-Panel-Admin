import { Button, Form, Space, message, InputNumber, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';
import { getOneDisbursement } from "../../../../../../api/disbursement/getOneDisbursement"
import { putTransfer } from '../../../../../../api/disbursement/putTransfer';
import { useState } from 'react';

const index = (props) => {
  const history = useHistory()
  const id = props.location.state.id
  const { data, error } = getOneDisbursement(id)

  const onFinish = async (values) => {
    values.user_id = data.user_id
    values.commission_id = data.commission_id
    values._method = "PUT"
    values.status = 2
    const response = await putTransfer(values, id)

    if (response == true) {
      message.success("Berhasil mengubah data pesanan")
      history.goBack()
    }
    else {
      message.error("Gagal mengubah data pesanan")
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
            name: ['request_nominal'],
            value: data && data?.request_nominal
          },
        ]}
      >

        <Form.Item
          label="Request Nominal"
          name="request_nominal"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Disbursement Name"
          name="disbursement_name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Disbursement Type"
          name="disbursement_type"
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Disbursement Bank"
          name="disbursement_bank"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Disbursement Norek"
          name="disbursement_norek"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Disbursement Nominal"
          name="disbursement_nominal"
        >
          <InputNumber />
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