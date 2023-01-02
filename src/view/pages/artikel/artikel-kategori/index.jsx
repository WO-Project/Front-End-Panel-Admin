import { useEffect, useState } from "react";

import { Row, Col, message } from "antd";

import TableCard from "../../../components/custom-components/TableCard";
import TableDisplay from "../../../components/custom-components/TableDisplay";
import ErrorPage from "../../../components/custom-components/Feedback/ErrorPage";

import columns from "./UserColumn";

import { getArticleCategories } from "../../../../api/artikel/category";
import { usePermissionContext } from "../../../../context/PermissionContext";

export default function index() {
  let { data, error, destroy, loading, errorDestroy, loadingDestroy } =
    getArticleCategories();
  const { permission } = usePermissionContext();
  const [onDelete, setOnDelete] = useState(false);

  useEffect(() => {
    if (errorDestroy != null || errorDestroy != undefined)
      message.error("Gagal menghapus kategori artikel");
  }, [errorDestroy]);

  useEffect(() => {
    if (loadingDestroy) {
      setOnDelete(true);
    }

    if (onDelete && !loadingDestroy) {
      message.info("Berhasil menghapus kategori artikel");
    }
  }, [loadingDestroy]);

  data = data
    .filter((d) => d.id !== undefined)
    .map((d) => {
      return {
        name: d.name,
        description: d.description,
        status: d.status,
        id: d.id,
        destroy,
        permission,
      };
    });

  if (error) return <ErrorPage message={"Gagal mengambil data!"} />;

  return (
    <>
      <TableCard back>
        <Row>
          <Col span={24}>
            {loading ? (
              <TableDisplay
                loading
                column={columns}
                addButton={true}
                createLink="/admin/kategori-artikel/create"
              />
            ) : (
              <TableDisplay
                data={data}
                column={columns}
                addButton={true}
                createLink="/admin/kategori-artikel/create"
              />
            )}
          </Col>
        </Row>
      </TableCard>
    </>
  );
}
