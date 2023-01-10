import { Row, Col } from "antd";

import TableDisplay from "../../../../components/custom-components/TableDisplay";
import TableCard from "../../../../components/custom-components/TableCard";
import Column from "./ProductColumn";
import { getProducts } from "../../../../../api/produk/getProducts";
import { usePermissionContext } from "../../../../../context/PermissionContext";

const ProdukUcapanDigital = ({ location }) => {
  let { data, deleteProduct } = getProducts();
  const { permission } = usePermissionContext();

  data = data?.map((product) => {
    return {
      ...product,
      deleteProduct: deleteProduct,
      permission,
    };
  });

  return (
    <TableCard back={location?.state?.back ? true : false}>
      <Row>
        <Col span={24}>
          <TableDisplay
            data={data}
            column={Column}
            addButton
            otherButton={[
              {
                name: "Kategori Produk",
                link: "/admin/kategori-produk-ucapan-digital",
              },
            ]}
          />
        </Col>
      </Row>
    </TableCard>
  );
};

export default ProdukUcapanDigital;
