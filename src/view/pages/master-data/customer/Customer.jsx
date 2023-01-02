import { Row, Col } from "antd";
import { getCustomers } from "../../../../api/customer/getCustomers";

import TableDisplay from "../../../components/custom-components/TableDisplay";
import TableCard from "../../../components/custom-components/TableCard";
import Column from "./CustomerColumn";
import { usePermissionContext } from "../../../../context/PermissionContext";

const MasterDisplay = () => {
  let { data, deleteCustomer } = getCustomers();
  const { permission } = usePermissionContext();
  data = data?.map((value) => ({
    ...value,
    deleteCustomer: deleteCustomer,
    permission,
  }));

  return (
    <TableCard>
      <Row>
        <Col span={24}>
          <TableDisplay data={data} column={Column} />
        </Col>
      </Row>
    </TableCard>
  );
};

export default MasterDisplay;
