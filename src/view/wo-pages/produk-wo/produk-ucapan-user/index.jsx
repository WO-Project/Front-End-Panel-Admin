import { useParams } from "react-router-dom";

import { getProducts } from "../../../../api/produk/getProducts";
import { useProdukWOData } from "../../../../api/produk-wo";

import { Row, Col } from "antd";

import TableCard from "../../../components/custom-components/TableCard";
import TableDisplay from "../../../components/custom-components/TableDisplay";

import columns from "./ProdukWO";
import { usePermissionContext } from "../../../../context/PermissionContext";

export default function index() {
  // const { data } = getProducts();
  const { data, error, loading, method } = useProdukWOData();
  const { userid } = useParams();
  const { permission } = usePermissionContext();

  return (
    <>
      <TableCard customTitle="Pesanan">
        <Row>
          <Col span={24}>
            <TableDisplay
              data={data.map((d) => ({
                wo: d.wedding_organizer_name,
                product: d.product_name,
                groom: d.groom,
                bride: d.bride,
                status: d.status,
                id: d.id,
                destroy: method.destroy,
                permission,
              }))}
              column={columns}
              addButton
              createLink={`${window.location.pathname}/create`}
              colomWidth={600}
            />
          </Col>
        </Row>
      </TableCard>
    </>
  );
}
