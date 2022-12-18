import { Button, Form, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';

import { getOneCommission } from "../../../../../../api/komisi/getOneCommission"

const index = (props) => {
  const history = useHistory()
  const title = `${props.location.state.permission} Data ${props.location.state.data}`
  const id = props.location.state.id
  const { data, error } = getOneCommission(id)

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
          label="Commission Name"
          name="commission name"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nama commission',
            },
          ]}
        >
          <p>{data && data.name}</p>
        </Form.Item>

        <Form.Item
          label="Commission Status"
          name="commission status"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan status commission',
            },
          ]}
        >
          <p>{data && data.type == 1 ? "Active" : "Inactive"}</p>
        </Form.Item>

        <Form.Item
          label="Commission Total Price"
          name="commission Total Price"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan total harga commission',
            },
          ]}
        >
          <p>{data && data.nominal}</p>
        </Form.Item>

        <Form.Item
          label="Commission Get"
          name="commission Get"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan yang didapat dari commission',
            },
          ]}
        >
          <p>{data && data.nominal_get}</p>
        </Form.Item>

        <Form.Item
          label="Commission Date"
          name="Commission Date"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan tanggal dari commission',
            },
          ]}
        >
          <p>{data && data.created_at}</p>
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="Product Name"
          rules={[
            {
              required: true,
              message: 'Mohon masukkan nama produk',
            },
          ]}
        >
          <p>{data && data.sales_order_item?.product?.name}</p>
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