import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Layout, Row, Col } from "antd";

import Sidebar from "./components/menu/Sidebar";
import MenuHeader from "./components/header";
// import MenuFooter from "./components/footer";
import ScrollTop from "./components/scroll-to-top";

const { Content } = Layout;

export default function VerticalLayout(props) {
  const { children } = props;

  const [visible, setVisible] = useState(false);

  // Redux
  const customise = useSelector((state) => state.customise);

  return (
    <Layout className="hp-app-layout">
      <Sidebar visible={visible} setVisible={setVisible} />

      <Layout className="hp-bg-black-20 hp-bg-color-dark-90">
        <MenuHeader setVisible={setVisible} />

        <Content className="hp-content-main">
          <Row justify="center">
            {customise.contentWidth === "full" && (
              <Col span={24}>{children}</Col>
            )}

            {customise.contentWidth === "boxed" && (
              <Col className="hp-w-100" style={{ maxWidth: 936 }}>
                {children}
              </Col>
            )}
          </Row>
        </Content>

        {/* <MenuFooter /> */}
        <Row
          style={{
            fontSize: "12.5px",
            backgroundColor: "rgb(252,252,252)",
            padding: "0 15px",
            marginTop: "30px",
            height: " 70px",
            alignItems: "center",
          }}
        >
          <Col flex="auto" style={{ padding: "15px" }}>
            Best Wishes
          </Col>
          <Col
            flex="auto"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "15px",
            }}
          >
            2022 © tokoweb.co
          </Col>
        </Row>
      </Layout>
      <ScrollTop />
    </Layout>
  );
}
