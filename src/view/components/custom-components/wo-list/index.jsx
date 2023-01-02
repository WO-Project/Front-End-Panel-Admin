import React, { useState } from "react";

import { Link } from "react-router-dom";

import TableTitle from "../TableTitle.jsx";

import { Card, Row, Col, List } from "antd";

export default function WOList({ dataWO }) {
  return (
    <Card className="hp-border-color-black-40">
      <Row>
        <Col>
          <TableTitle />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={dataWO}
            pagination={{
              size: "small",
            }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link to={item.link}>
                      {item.title} ({item.key})
                    </Link>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
}
