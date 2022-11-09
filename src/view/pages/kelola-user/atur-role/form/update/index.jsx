import { Button, Form, Input, Space, Row, Col, message, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';
import { Menus } from '../../data/Menu'
import { getOneRole } from '../../../../../../api/role/getOneRole';

const index = (props) => {
  const history = useHistory()
  const id = props.location.state.id
  const { data: role } = getOneRole(id)

  const onFinish = async (values) => {
    const form = new FormData()
    form.append('data', values)
  };

  const onFinishFailed = () => {
    message.error('Gagal mengubah role');
  };

  return (
    <CardForm title="Ubah Jenis Role">
      <Form
        name="basic"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout='vertical'
        size='small'
        style={{ display: 'block' }}
        fields={[
          {
            name: ['name'],
            value: role?.name
          },
          {
            name: ['status'],
            value: role?.status
          },
          {
            name: ['role'],
            value: ["Ubah permission", "Buat permission"]
          },
        ]}
      >

        <Space direction='vertical' size='small' style={{ display: 'flex' }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Nama"
                name="name"
                labelAlign='left'
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Nama di sistem"
                name="system_name"
                labelAlign='left'
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Checkbox */}
          {Menus?.map((menu) => (
            <Row>
              <Col span={24}>
                <Form.Item
                  label={menu.title}
                  name={menu.name}
                  labelAlign='left'
                  valuePropName="checked"
                >
                  <Checkbox.Group defaultValue={["Ubah permission", "Buat permission"]} style={{ lineHeight: '32px', width: '100%' }}>
                    <Row>
                      {menu.label?.map((label, i) => (
                        <Col span={6}>
                          <Checkbox key={i} value={menu.value[i]} style={{ lineHeight: '32px' }}>
                            {label}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row >
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </Row>
          ))}

          {/* Button */}
          <Row>
            <Col>
              <Form.Item
                wrapperCol={{
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
            </Col>
          </Row>
        </Space>

      </Form>
    </CardForm >
  );
};


export default index