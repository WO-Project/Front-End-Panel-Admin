import { Col, Row } from 'antd'
import React from 'react'
import TableCard from '../../../components/custom-components/TableCard'
import TableDisplay from '../../../components/custom-components/TableDisplay'
import Column from './RoleColumn'
import { getRoles } from '../../../../api/role/getRoles'
import { usePermissionContext } from '../../../../context/PermissionContext'

const AturRole = () => {
  const { permission } = usePermissionContext()

  let { data, deleteRole } = getRoles()
  data = data?.map((value) => (
    { ...value, deleteRole: deleteRole, permission }
  ))

  return (
    <TableCard >
      <Row>
        <Col span={24}>
          <TableDisplay data={data} column={Column} addButton={true} />
        </Col>
      </Row>
    </TableCard>
  )
}

export default AturRole