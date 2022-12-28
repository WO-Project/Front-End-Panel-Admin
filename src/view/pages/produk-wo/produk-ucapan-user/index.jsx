import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getProducts } from "../../../../api/produk/getProducts";
import { useProdukWOData } from "../../../../api/produk-wo";

import { Row, Col, message } from "antd";

import TableCard from "../../../components/custom-components/TableCard";
import TableDisplay from "../../../components/custom-components/TableDisplay";

import columns from "./ProdukWO";
import { usePermissionContext } from "../../../../context/PermissionContext";

export default function index() {
  // const { data } = getProducts();
  const { data, error, loading, method } = useProdukWOData();
  const { userid } = useParams();
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
      <TableCard customTitle="Produk Ucapan User">
        <Row>
          <Col span={24}>
            <TableDisplay
              data={data.map((d) => ({
                wo: d.wedding_organizer_name,
                product: d.product_name,
                groom: d.groom,
                bride: d.bride,
                status: d.status,
                price: d.price,
                id: d.id,
                destroy: method.destroy,
                permission,
              }))}
              column={columns}
              addButton
              createLink={`${window.location.pathname}/create`}
              colomWidth={600}
              filteredColumn={[
                "wo",
                "product",
                "groom",
                "bride",
                {
                  column: "status",
                  mapped: {
                    1: "aktif",
                    2: "nonAktif",
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </TableCard>
    </>
  );
}
