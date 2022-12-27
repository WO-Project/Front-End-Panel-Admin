import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Card, Statistic, Button, Table, Spin } from "antd";
import ErrorPage from "../../components/custom-components/Feedback/ErrorPage";
import {
  UserOctagon,
  SecurityUser,
  Profile2User,
  ShoppingCart,
} from "iconsax-react";

import { bestSellingColumns, lastOrderColumns } from "./Columns";

import {
  getCount,
  getBestSelling,
  getLatestOrder,
} from "../../../api/dashboard";

import "./style.css";

export default function DashBoard() {
  const {
    data: data_count,
    loading: loading_count,
    error: error_count,
  } = getCount();

  const {
    data: data_best,
    loading: loading_best,
    error: error_best,
  } = getBestSelling();

  const {
    data: data_latest,
    loading: loading_latest,
    error: error_latest,
  } = getLatestOrder();

  console.log(data_latest);

  if (error_best || error_count || error_latest)
    return <ErrorPage message="Gagal mengambil data!" />;

  return (
    <>
      <Row gutter={[32, 32]}>
        {loading_count ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spin />
          </div>
        ) : (
          <>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total User"
                  value={data_count.total_user_count}
                  prefix={<UserOctagon color="#f47373" size={30} />}
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card>
                <Statistic
                  title="Wedding Organizer"
                  value={data_count.user_count}
                  prefix={<SecurityUser color="#F45000" size={30} />}
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card>
                <Statistic
                  title="Pelanggan"
                  value={data_count.customer_count}
                  prefix={<Profile2User color="#F45000" size={30} />}
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card>
                <Statistic
                  title="Pesanan"
                  value={data_count.sales_order_count}
                  prefix={<ShoppingCart color="#37d67a" />}
                />
              </Card>
            </Col>
          </>
        )}

        {loading_best ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spin />
          </div>
        ) : (
          <Col span={24}>
            <Card>
              <Table
                dataSource={data_best}
                columns={bestSellingColumns}
                title={() => "Best Seller Products"}
                footer={() => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Link to="/admin/pesanan">
                        <Button danger>Selengkapnya</Button>
                      </Link>
                    </div>
                  );
                }}
                pagination={false}
              />
            </Card>
          </Col>
        )}

        {loading_latest ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spin />
          </div>
        ) : (
          <Col span={24}>
            <Card>
              <Table
                dataSource={data_latest.map((d) => ({
                  name: d.product?.name,
                  bride: d.sales_order?.bride?.bride,
                  groom: d.sales_order?.bride?.groom,
                  wo: d.sales_order?.bride?.wedding_organizer?.name,
                }))}
                columns={lastOrderColumns}
                title={() => "Pesanan Terbaru"}
                footer={() => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Link to="/admin/pesanan">
                        <Button danger>Selengkapnya</Button>
                      </Link>
                    </div>
                  );
                }}
                pagination={false}
              />
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}
