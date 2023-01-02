import { useState, useEffect } from "react";

import { Row, Col, message } from "antd";

import { useKuponData } from "../../../api/kupon";
import { usePermissionContext } from "../../../context/PermissionContext";

import TableCard from "../../components/custom-components/TableCard";
import TableDisplay from "../../components/custom-components/TableDisplay";

import columns from "./KuponColumns";

export default function index() {
  const { data, detailData, error, loading, method } = useKuponData();
  const { permission } = usePermissionContext();
  const [onDelete, setOnDelete] = useState(false);

  useEffect(() => {
    if (error.destroy != null || error.destroy != undefined)
      message.error("Gagal menghapus komisi");
  }, [error.destroy]);

  useEffect(() => {
    if (loading.destroy) {
      setOnDelete(true);
    }

    if (onDelete && !loading.destroy) {
      message.info("Berhasil menghapus komisi");
    }
  }, [loading.destroy]);

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
                  permission,
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
