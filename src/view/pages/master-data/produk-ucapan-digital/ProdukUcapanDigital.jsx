import { Row, Col } from 'antd'

import TableDisplay from '../../../components/custom-components/TableDisplay'
import TableCard from '../../../components/custom-components/TableCard'
import Column from './ProductColumn'
import { getProducts } from '../../../../api/produk-wo/getProducts'

const ProdukUcapanDigital = () => {
  let { data, deleteProduct } = getProducts()

  data = data?.map((product) => {
    return {
      ...product,
      deleteProduct: deleteProduct,
    }
  })

  return (
    <TableCard>
      <Row>
        <Col span={24}>
          <TableDisplay data={data} column={Column} addButton />
        </Col>
      </Row>
    </TableCard>
  )
}

export default ProdukUcapanDigital