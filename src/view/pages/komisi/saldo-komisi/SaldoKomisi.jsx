import { Row, Col } from 'antd'

import TableDisplay from '../../../components/custom-components/TableDisplay'
import TableCard from '../../../components/custom-components/TableCard'
import Column from './SaldoKomisiColumn'

import { getWeddingOrganizers } from "../../../../api/wedding-organizer/getWeddingOrganizers"
import { usePermissionContext } from '../../../../context/PermissionContext'

const MasterDisplay = () => {
  let { data, deleteWO } = getWeddingOrganizers()
  const { permission } = usePermissionContext()

  data = data.map((d) => {
    return {
      id: d?.id,
      name: d?.name,
      saldo: d?.saldo,
      deleteWO: deleteWO,
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