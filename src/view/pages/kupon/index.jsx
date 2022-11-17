import { Row, Col } from "antd";

import { useKuponData } from "../../../api/kupon";

import TableCard from "../../components/custom-components/TableCard";
import TableDisplay from "../../components/custom-components/TableDisplay";

import columns from "./KuponColumns";

export default function index() {
  const { data, detailData, error, loading, method } = useKuponData();

  return (
    <>
      <TableCard customTitle="Voucher/Kupon">
        <Row>
          <Col span={24}>
            <TableDisplay
              data={data?.map((d) => {
                return {
                  name: d.name,
                  type: d.type == 1 ? "persentase" : "nominal",
                  nominal: d.nominal,
                  status: d.status == 1 ? "Aktif" : "Non-aktif",
                  id: d.id,
                  destroy: method.destroy,
                };
              })}
              column={columns}
              addButton={true}
              createLink={`${window.location.pathname}/create`}
              colomWidth={600}
            />
          </Col>
        </Row>
      </TableCard>
    </>
  );
}
