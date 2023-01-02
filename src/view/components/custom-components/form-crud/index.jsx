import {
  Button,
  Form,
  Input,
  InputNumber,
  Switch,
  Card,
} from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

const index = ({ permission, data }) => {
  const history = useHistory()

  return (
    <Card className='form-crud'>
      <p className='title'>{`${permission} Data ${data}`}</p>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: 'small',
        }}
        size='small'
      >
        <Form.Item label="Nama">
          <Input />
        </Form.Item>
        <Form.Item label="Email">
          <Input />
        </Form.Item>
        <Form.Item label="Level">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Status" valuePropName="checked">
          <Switch danger />
        </Form.Item>
        <Form.Item label="Button">
          <Button danger style={{ marginRight: '15px' }} >Simpan</Button>
          <Button onClick={() => history.goBack()} danger >Batal</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};


export default index