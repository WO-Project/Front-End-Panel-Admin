import { Row, Col } from 'antd'

import TableDisplay from '../../../components/custom-components/TableDisplay'
import TableCard from '../../../components/custom-components/TableCard'
import Column from './PencairanColumn'

import { getDisburseRequests } from "../../../../api/disbursement/getDisburseRequests"
import { usePermissionContext } from '../../../../context/PermissionContext'

const MasterDisplay = () => {
  let { data, deleteRequests } = getDisburseRequests()
  const { permission } = usePermissionContext()

  data = data.map((d) => {
    return {
      id: d.id,
      request_date: d.request_date,
      request_nominal: d.request_nominal,
      wo: d.commission ? d.commission.wedding_organizer.name : "",
      deleteRequests: deleteRequests,
      permission
    }
  })

  return (
    <TableCard >

      <Row>
        <Col span={24}>
          <TableDisplay data={data} column={Column} />
        </Col>
      </Row>

    </TableCard>
  )
}

export default MasterDisplay