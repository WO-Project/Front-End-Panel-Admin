import React, { useEffect, useMemo } from "react";

import { Col, Row, Card, Statistic, Button, List, Avatar, Table } from "antd";
import {
  UserOctagon,
  SecurityUser,
  Profile2User,
  ShoppingCart,
} from "iconsax-react";

import { dummy } from "./dummy";
import { dummy2 } from "./dummy2";
import { dummyColumns } from "./dummyColumns";
import { dummyColumns2 } from "./dummyColumns2";

import { getCount, getBestSelling } from "../../../api/dashboard";

import "./style.css";

export default function index() {
  const count = getCount();
  const bestSelling = getBestSelling();

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Pelanggan"
              value={count.data.customer_count}
              prefix={<Profile2User color="#F45000" size={30} />}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Statistic
              title="Pesanan"
              value={count.data.sales_order_count}
              prefix={<ShoppingCart color="#37d67a" />}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Table
              dataSource={dummy}
              columns={dummyColumns}
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
                    <Button>Selengkapnya</Button>
                  </div>
                );
              }}
              pagination={false}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Table
              dataSource={dummy2}
              columns={dummyColumns2}
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
                    <Button>Selengkapnya</Button>
                  </div>
                );
              }}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
