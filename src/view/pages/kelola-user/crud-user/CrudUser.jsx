import { Row, Col } from "antd";
import { getUsers } from "../../../../api/kelola-user/getUser";

import TableDisplay from "../../../components/custom-components/TableDisplay";
import TableCard from "../../../components/custom-components/TableCard";
import Column from "./UserColumn";
import { usePermissionContext } from "../../../../context/PermissionContext";

const index = () => {
  let { data, deleteUser } = getUsers();
  const { permission } = usePermissionContext();

  data = data?.map((values) => ({
    ...values,
    deleteUser: deleteUser,
    permission,
  }));

  return (
    <TableCard customTitle="User">
      <Row>
        <Col span={24}>
          <TableDisplay data={data} column={Column} addButton={true} />
        </Col>
      </Row>
    </TableCard>
  );
};

export default index;
