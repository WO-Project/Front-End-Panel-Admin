import { Button, Form, Input, Space, Row, Col, message, Checkbox, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import CardForm from '../../../../../components/custom-components/form-crud/CardForm';
import { getOneRole } from '../../../../../../api/role/getOneRole';
import { getPermissions } from '../../../../../../api/permission/getPermissions';
import { useEffect } from 'react';
import { useState } from 'react';
import { putRole } from '../../../../../../api/role/putRole';

const field = (rolePermission, permissions) => {
  const fieldData = permissions?.map((permission) => {
    const sub_menu_id = permission.sub_menus.map((sub_menu) => {
      return sub_menu.id
    })

    const role_permission_id = rolePermission.filter((id) => {
      return sub_menu_id.includes(id)
    })

    return {
      name: [permission.name],
      value: role_permission_id
    }
  })
  return fieldData
}

const filterRolePermission = (role) => {
  if (role == null) return null
  const id = role?.access_menu_items.map((access_menus) => {
    return access_menus?.sub_menu_id
  })
  return id
}

const formPut = (values) => {
  const form = new FormData()
  form.append('name', values.name)
  form.append('status', values.status)
  form.append("_method", "put")

  let i = 0
  for (const value in values) {
    if (values[value] != undefined && value != "name" && value != "system_name") {
      for (let id in values[value]) {
        form.append(`access_menu_items[${i}][sub_menu_id]`, values[value][id])
        i++;
      }
    }
  }

  return form

  // for (let pair of form.entries()) {
  //   console.log(pair[0] + ', ' + pair[1]);
  // }
}

const index = (props) => {
  const history = useHistory()
  const id = props.location.state.id

  const { data: role } = getOneRole(id)
  const { data: permissions } = getPermissions()

  const [rolePermission, setRolePermission] = useState(null)
  const [fields, setFields] = useState([])

  useEffect(() => {
    const role_permission = filterRolePermission(role)
    setRolePermission(role_permission)
  }, [role])

  useEffect(() => {
    if (rolePermission != null && permissions != null) {
      setFields(field(rolePermission, permissions))
    }
  }, [rolePermission, permissions])

  const onFinish = async (values) => {
    const form = formPut(values)
    const success = await putRole(form, id)

    if (success?.data?.success) {
      message.success('Berhasil mengubah role')
      history.goBack()
    }
    else {
      message.error('Gagal mengubah role')
    }
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
          ...fields
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
                name="name"
                labelAlign='left'
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Checkbox */}
          {permissions?.map((permission) => (
            <Row>
              <Col span={24}>
                <Form.Item
                  label={permission?.name}
                  name={permission?.name}
                  labelAlign='left'
                >
                  <Checkbox.Group style={{ lineHeight: '32px', width: '100%' }}>
                    <Row>
                      {permission?.sub_menus?.map((values, i) => (
                        <Col span={6}>
                          <Checkbox key={i} defaultChecked={true} value={values?.id} style={{ lineHeight: '32px' }}>
                            {values?.name}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row >
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </Row>
          ))}

          <Form.Item
            label="Status"
            name="status"
            labelAlign='left'
          >
            <Select
              style={{
                width: 200,
              }}
            >
              <Option value={1}>Aktif</Option>
              <Option value={2}>Non Aktif</Option>
            </Select>
          </Form.Item>

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