import { Row, Col } from "antd";

import TableCard from "../../../components/custom-components/TableCard";
import TableDisplay from "../../../components/custom-components/TableDisplay";

import columns from "./UserColumn";

import { getArticleCategories } from "../../../../api/artikel/category";
import { usePermissionContext } from "../../../../context/PermissionContext";

export default function index() {
  let { data, error, destroy } = getArticleCategories();
  const { permission } = usePermissionContext();

  data = data
    .filter((d) => d.id !== undefined)
    .map((d) => {
      return {
        name: d.name,
        description: d.description,
        id: d.id,
        destroy,
        permission,
      };
    });

  return (
    <>
      <TableCard back>
        <Row>
          <Col span={24}>
            <TableDisplay
              data={data}
              column={columns}
              addButton={true}
              createLink="/admin/kategori-artikel/create"
            />
          </Col>
        </Row>
      </TableCard>
    </>
  );
}
