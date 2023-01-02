import { Row, Col } from "antd";

import TableDisplay from "../../../../components/custom-components/TableDisplay";
import TableCard from "../../../../components/custom-components/TableCard";
import Column from "./kategoriCol";
import { getProductCategories2 } from "../../../../../api/produk/product-categories/getProductCategories2";
import { usePermissionContext } from "../../../../../context/PermissionContext";

const ProdukUcapanDigital = () => {
  let { data, deleteProductCategory } = getProductCategories2();
  const { permission } = usePermissionContext()

  data = data?.map((product) => {
    return {
      ...product,
      deleteProductCategory: deleteProductCategory,
      permission
    };
  });

  return (
    <TableCard back="/admin/produk-ucapan-digital">
      <Row>
        <Col span={24}>
          <TableDisplay data={data} column={Column} addButton />
        </Col>
      </Row>
    </TableCard>
  );
};

export default ProdukUcapanDigital;
