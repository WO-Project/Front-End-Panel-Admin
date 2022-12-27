import { Button, Form, Space, message, InputNumber } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';
import { getPesanan } from "../../../../../../api/pesanan/getPesanan"
import { putPesanan } from '../../../../../../api/pesanan/putPesanan';

const index = (props) => {
  const history = useHistory()
  const id = props.location.state.id
  const { data, error } = getPesanan(id)

  const onFinish = async (values) => {
    const response = await putPesanan(values, id)
    const success = response.data?.success
    if (success) {
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
            name: ['sales-order-id'],
            value: data && data?.sales_order_id
          },
          {
            name: ['product-id'],
            value: data && data?.product_id
          },
          {
            name: ['price'],
            value: data && data?.price
          },
          {
            name: ['status'],
            value: data && data?.status
          },
        ]}
      >
        <Form.Item
          label="Sales Order ID"
          name="sales-order-id"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Product ID"
          name="product-id"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
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