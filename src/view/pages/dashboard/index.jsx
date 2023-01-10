import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { usePermissionContext } from "../../../context/PermissionContext";

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
import LoadingSpinner from "../../components/custom-components/LoadingSpinner";

export default function DashBoard() {
  const { permission } = usePermissionContext();

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

  if (error_best || error_count || error_latest)
    return <ErrorPage message="Gagal mengambil data!" />;

  return (
    <>
      <Row gutter={[32, 32]}>
        {loading_count ? (
          <LoadingSpinner />
        ) : (
          <>
            <Col span={6}>
              <Link to="/admin/crud-user">
                <Card className="clickable-counter">
                  <Statistic
                    title="Total User"
                    value={data_count.total_user_count}
                    prefix={<UserOctagon color="#f47373" size={30} />}
                  />
                </Card>
              </Link>
            </Col>

            <Col span={6}>
              <Link to="/admin/wedding-organizer">
                <Card className="clickable-counter">
                  <Statistic
                    title="Wedding Organizer"
                    value={data_count.user_count}
                    prefix={<SecurityUser color="#F45000" size={30} />}
                  />
                </Card>
              </Link>
            </Col>

            <Col span={6}>
              <Link to="/admin/customer">
                <Card className="clickable-counter">
                  <Statistic
                    title="Pelanggan"
                    value={data_count.customer_count}
                    prefix={<Profile2User color="#F45000" size={30} />}
                  />
                </Card>
              </Link>
            </Col>

            <Col span={6}>
              <Link to="/admin/pesanan">
                <Card className="clickable-counter">
                  <Statistic
                    title="Pesanan"
                    value={data_count.sales_order_count}
                    prefix={<ShoppingCart color="#37d67a" />}
                  />
                </Card>
              </Link>
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
                dataSource={data_best.map((d) => ({ ...d, permission }))}
                columns={bestSellingColumns}
                title={() => (
                  <h1 style={{ fontSize: 20, fontWeight: 600 }}>
                    Best Seller Products
                  </h1>
                )}
                footer={() => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Link
                        to={{
                          pathname: "/admin/produk-ucapan-digital",
                          state: {
                            back: true,
                          },
                        }}
                      >
                        <Button type="primary" danger>
                          Selengkapnya
                        </Button>
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
                  brideGroom: `${d.sales_order?.bride?.bride} & ${d.sales_order?.bride?.groom}`,
                  wo: d.sales_order?.bride?.wedding_organizer?.name,
                  customer: d.sales_order?.customer?.name,
                  id: d.id,
                  permission,
                }))}
                columns={lastOrderColumns}
                title={() => (
                  <h1 style={{ fontSize: 20, fontWeight: 600 }}>
                    Pesanan Terbaru
                  </h1>
                )}
                footer={() => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Link
                        to={{
                          pathname: `admin/pesanan`,
                          state: {
                            back: true,
                          },
                        }}
                      >
                        <Button type="primary" danger>
                          Selengkapnya
                        </Button>
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
