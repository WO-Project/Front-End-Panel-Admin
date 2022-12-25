import { useAffiliatesData } from "../../../../api/afiliasi";
import { useCommisionData } from "../../../../api/komisi";

import { Row, Col, message } from "antd";

import TableCard from "../../../components/custom-components/TableCard";
import TableDisplay from "../../../components/custom-components/TableDisplay";
import ErrorPage from "../../../components/custom-components/Feedback/ErrorPage";

import columns from "./Commisions";
import { usePermissionContext } from "../../../../context/PermissionContext";
import { useState } from "react";
import { useEffect } from "react";

export default function index() {
  const { data, error, loading, method } = useCommisionData();
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

  if (error.getAll) return <ErrorPage message={"Gagal mengambil data!"} />;

  return (
    <>
      <TableCard customTitle="Kategori Komisi/Group User">
        <Row>
          <Col span={24}>
            {loading.getAll ? (
              <TableDisplay
                loading
                column={columns}
                addButton
                colomWidth={600}
                filteredColumn={["name"]}
              />
            ) : (
              <TableDisplay
                data={data.map((d) => ({
                  name: d.name,
                  type: d.type,
                  nominal: d.nominal,
                  wo: d.wedding_organizer?.name,
                  status: d.status,
                  id: d.id,
                  destroy: method.destroy,
                  permission,
                }))}
                column={columns}
                addButton
                createLink={`${window.location.pathname}/create`}
                colomWidth={600}
                filteredColumn={[
                  "name",
                  "wo",
                  {
                    column: "status",
                    mapped: {
                      1: "aktif",
                      2: "nonAktif",
                    },
                  },
                  {
                    column: "type",
                    mapped: {
                      1: "persentase",
                      2: "nominal",
                    },
                  },
                ]}
              />
            )}
          </Col>
        </Row>
      </TableCard>
    </>
  );
}
