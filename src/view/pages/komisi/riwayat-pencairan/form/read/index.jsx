import { Button, Form, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';

import { getOneDisbursement } from "../../../../../../api/disbursement/getOneDisbursement"

const index = (props) => {
  const history = useHistory()
  const title = `${props.location.state.permission} Data ${props.location.state.data}`
  const id = props.location.state.id
  const { data, error } = getOneDisbursement(id)

  return (
    <CardForm title={title}>
      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 14,
        }}
        autoComplete="off"
        size='small'
      >
        <Form.Item
          label="Disbursement Name"
          name="disbursement name"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nama disbursement',
            },
          ]}
        >
          <p>{data && data.disbursement_name}</p>
        </Form.Item>

        <Form.Item
          label="Disbursement Status"
          name="disbursement status"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan status pencairan',
            },
          ]}
        >
          <p>{data && data.status == 1 ? "Unpaid" : "Paid"}</p>
        </Form.Item>

        <Form.Item
          label="Request Date"
          name="request date"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan tanggal request',
            },
          ]}
        >
          <p>{data && data.request_date}</p>
        </Form.Item>

        <Form.Item
          label="Request Nominal"
          name="request nominal"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nominal ',
            },
          ]}
        >
          <p>{data && data.request_nominal}</p>
        </Form.Item>

        <Form.Item
          label="Disbursement Type"
          name="disbursement type"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan tipe dari pencairan',
            },
          ]}
        >
          <p>{data && data.disbursement_type === 1 ? "Percent": "Nominal"}</p>
        </Form.Item>

        <Form.Item
          label="Disbursement Bank"
          name="disbursement bank"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan bank untuk pencairan',
            },
          ]}
        >
          <p>{data && data.disbursement_bank}</p>
        </Form.Item>

        <Form.Item
          label="Disbursement Norek"
          name="disbursement norek"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nomor rekening untuk pencairan',
            },
          ]}
        >
          <p>{data && data.disbursement_norek}</p>
        </Form.Item>

        <Form.Item
          label="Disbursement Nominal"
          name="disbursement nominal"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nominal untuk pencairan',
            },
          ]}
        >
          <p>{data && data.disbursement_nominal}</p>
        </Form.Item>

        <Form.Item
          label="Wedding Organizer"
          name="wedding organizer"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan wedding organizer',
            },
          ]}
        >
          <p>{data && data.commission?.wedding_organizer?.name}</p>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 4,
          }}
        >
          <Space size='middle'>
            <Button danger htmlType="button" onClick={() => history.goBack()}>
              Kembali
            </Button>
          </Space>
        </Form.Item>

      </Form>
    </CardForm>
  );
};


export default index