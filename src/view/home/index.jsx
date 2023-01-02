import React from "react";

import { Card, Col, Row } from "antd";

import PageTitle from "../../layout/components/content/page-title";

export default function Home() {
  return (
    <Row gutter={[32, 32]}>
      <PageTitle pageTitle="Home Page" />

      <Col span={24}>
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <Card className="hp-border-color-black-40 hp-border-color-dark-80">
              <h4>Let's get started 🚀</h4>

              <Row>
                <Col md={12} span={24}>
                  <p className="hp-p1-body">
                    Are you ready? Please read our{" "}
                    <a
                      className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-hover-text-color-primary-3 hp-hover-text-color-dark-0 hp-transition"
                      href="https://hypeople-studio.gitbook.io/yohp-admin-template/"
                      target="_blank"
                    >
                      Documentation
                    </a>{" "}
                    to understand the technical details of the project to use
                    the template.
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={24}>
            <Card className="hp-border-color-black-40">
              <h4>Would you like to browse the components? 👀</h4>

              <Row>
                <Col md={12} span={24}>
                  <p className="hp-p1-body">
                    Everything is in the details. So why wouldn't you want to
                    take a look at the{" "}
                    <a
                      className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-hover-text-color-primary-3 hp-hover-text-color-dark-0 hp-transition"
                      href="https://yoda.hypeople.studio/yohp-admin-template/react/components/components-page"
                      target="_blank"
                    >
                      components
                    </a>{" "}
                    from the preview page? Enjoy!
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
