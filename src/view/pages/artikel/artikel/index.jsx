import { useState, useEffect } from "react";

import { Row, Col, message } from "antd";

import TableCard from "../../../components/custom-components/TableCard";
import TableDisplay from "../../../components/custom-components/TableDisplay";
import ErrorPage from "../../../components/custom-components/Feedback/ErrorPage";

import columns from "./ArticleColumn";

import { getArticles } from "../../../../api/artikel";
import { asset } from "../../../../configs/apiConfig";
import { usePermissionContext } from "../../../../context/PermissionContext";

export default function index() {
  let { data, error, errorDestroy, loading, loadingDestroy, destroy } =
    getArticles();
  const { permission } = usePermissionContext();

  const [onDelete, setOnDelete] = useState(false);

  useEffect(() => {
    if (errorDestroy != null || errorDestroy != undefined)
      message.error("Gagal menghapus artikel");
  }, [errorDestroy]);

  useEffect(() => {
    if (loadingDestroy) {
      setOnDelete(true);
    }

    if (onDelete && !loadingDestroy) {
      message.info("Berhasil menghapus artikel");
    }
  }, [loadingDestroy]);

  data = data
    .filter((d) => d.id !== undefined)
    .map((d) => {
      return {
        thumbnail: asset(d.thumbnail),
        name: d.title,
        status: d.status,
        article_category: d.article_category ? d.article_category.name : "",
        id: d.id,
        destroy,
        permission,
      };
    });

  if (error) return <ErrorPage message={"Gagal mengambil data!"} />;

  return (
    <>
      <TableCard customTitle="Artikel">
        <Row>
          <Col span={24}>
            {loading ? (
              <TableDisplay
                loading
                column={columns}
                addButton={true}
                createLink={`${window.location.pathname}/create`}
                otherButton={[
                  {
                    name: "Kelola Kategori",
                    link: "/admin/kategori-artikel",
                  },
                ]}
              />
            ) : (
              <TableDisplay
                data={data}
                column={columns}
                addButton={true}
                createLink={`${window.location.pathname}/create`}
                otherButton={[
                  {
                    name: "Kelola Kategori",
                    link: "/admin/kategori-artikel",
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
