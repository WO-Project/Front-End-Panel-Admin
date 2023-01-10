import { Row, Col } from "antd";
import { useHistory } from "react-router-dom";

import TableDisplay from "../../../components/custom-components/TableDisplay";
import TableCard from "../../../components/custom-components/TableCard";
import Column from "./PesananColumn";

import { getOrders } from "../../../../api/pesanan";
import { usePermissionContext } from "../../../../context/PermissionContext";

const MasterDisplay = ({ location }) => {
  let { data, deletePesanan } = getOrders();
  const { permission } = usePermissionContext();
  data = data.map((d) => {
    return {
      id: d.id,
      name: d.product ? d.product.name : "",
      price: d.price,
      wo: d.sales_order ? d.sales_order.bride.wedding_organizer.name : "",
      deletePesanan: deletePesanan,
      permission,
    };
  });

  return (
    <TableCard back={location?.state?.back ? true : false}>
      <Row>
        <Col span={24}>
          <TableDisplay data={data} column={Column} />
        </Col>
      </Row>
    </TableCard>
  );
};

export default MasterDisplay;
