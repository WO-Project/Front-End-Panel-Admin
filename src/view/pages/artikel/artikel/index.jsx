import { Row, Col } from "antd";

import TableCard from "../../../components/custom-components/TableCard";
import TableDisplay from "../../../components/custom-components/TableDisplay";

import columns from "./ArticleColumn";

import { getArticles } from "../../../../api/artikel";

export default function index() {
  let { data, error, destroy } = getArticles();

  data = data
    .filter((d) => d.id !== undefined)
    .map((d) => {
      return {
        name: d.title,
        status: d.status,
        article_category: d.article_category ? d.article_category.name : "",
        id: d.id,
        destroy,
      };
    });

  return (
    <>
      <TableCard customTitle="Artikel">
        <Row>
          <Col span={24}>
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
          </Col>
        </Row>
      </TableCard>
    </>
  );
}
